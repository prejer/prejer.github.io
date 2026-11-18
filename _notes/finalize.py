# Produce final task images (hide answer marks) + tasks.json for the site
import sys; sys.path.insert(0,"/home/claude/eebuild")
import json,glob,os,re,pymupdf
from PIL import Image
from crop import ED, trim
SITE="/home/claude/prejer.github.io"
OUT=f"{SITE}/assets/ee1"; os.makedirs(OUT,exist_ok=True)
keys=json.load(open("keys.json"))
TOP={"dc":"Obwody prądu stałego","pole":"Elektrostatyka i kondensatory","mag":"Magnetyzm","ac":"Prąd przemienny","tri":"Układy trójfazowe","trafo":"Transformatory","masz":"Maszyny elektryczne","elek":"Elektronika i przekształtniki","miern":"Miernictwo","inst":"Instalacje i ochrona"}
def recolor(im):
    px=im.load()
    for y in range(im.height):
        for x in range(im.width):
            r,g,b=px[x,y]
            if r>140 and g<120 and b<120: px[x,y]=(30,30,30)          # red text -> black
            elif r>200 and g>200 and b<120: px[x,y]=(255,255,255)     # yellow highlight -> white
    return im
def crop_question_only(ed,n):
    # for editions whose option text we render as buttons: crop up to the first option line
    doc=pymupdf.open(ED[ed]); q=0; starts=[]
    for pi,pg in enumerate(doc):
        for b in pg.get_text("dict")["blocks"]:
            for l in b.get("lines",[]):
                t="".join(s["text"] for s in l["spans"]).strip()
                if re.match(r"^Zadanie\s*\d+",t): q+=1
                if q==n and (re.match(r"^A[\.\)]",t) or t.startswith("Wyłącznik otwarty")):
                    return pi,l["bbox"][1]
    return None
tasks=[]
for f in sorted(glob.glob("data/*.json"),reverse=True):
    ed=os.path.basename(f)[:-5]; d=json.load(open(f))
    for i,item in enumerate(d["q"],1):
        ans,topic,expl=item[0],item[1],item[2]; opts=item[3] if len(item)>3 else None
        im=Image.open(f"crops/{ed}-{i:02d}.png").convert("RGB")
        if opts:
            # cut at the options: find their y on the page and crop the stored image proportionally
            pi_y=crop_question_only(ed,i)
            if pi_y:
                doc=pymupdf.open(ED[ed]); pg=doc[pi_y[0]]
                # re-render from question start to option start
                from crop import lines
                qs=None; q=0
                for pp,page in enumerate(doc):
                    for bb,t,_ in lines(page):
                        if re.match(r"^Zadanie\s*\d+",t):
                            q+=1
                            if q==i: qs=(pp,bb[1])
                if qs and qs[0]==pi_y[0]:
                    clip=pymupdf.Rect(20,qs[1]-4,pg.rect.width-20,pi_y[1]-4)
                    pix=pg.get_pixmap(matrix=pymupdf.Matrix(2.2,2.2),clip=clip)
                    im=trim(Image.frombytes("RGB",(pix.width,pix.height),pix.samples)) or im
        im=recolor(im)
        if im.width>1300: im=im.resize((1300,int(im.height*1300/im.width)))
        name=f"{ed}-{i:02d}.png"
        im=im.convert("P",palette=Image.ADAPTIVE,colors=64)
        im.save(f"{OUT}/{name}",optimize=True)
        k=ans if ans else keys.get(ed,{}).get(str(i))
        tasks.append({"id":f"{ed}-{i}","ed":ed.replace("-","/"),"n":i,"img":f"assets/ee1/{name}","ans":k.split(","),"topic":topic,"expl":expl,"opts":opts})
json.dump({"topics":TOP,"tasks":tasks},open(f"{SITE}/assets/ee1/tasks.json","w"),ensure_ascii=False)
print(len(tasks),"tasks")
