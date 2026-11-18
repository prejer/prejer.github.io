import pymupdf, re, sys, os, json
from PIL import Image, ImageChops
OUT="/home/claude/eebuild/crops"; os.makedirs(OUT,exist_ok=True)
C="/home/claude/ee/c/ETAP I/ETAP I stare edycje EUROELETRA/"
ED={
 "2025-26":"/home/claude/ee/a/EUROELEKTRA elektryczna.pdf",
 "2023-24":"/home/claude/ee/b/EUROELEKTRA_ETAP I grupa elektryczna.pdf",
 "2022-23":"/home/claude/ee/c/ETAP I/Grupa Elektryczna 2022_2023/ETAP I Elektryczna.pdf",
 "2020-21":C+"E_20-21_I_elektrotechnika_zad.pdf","2019-20":C+"E_19-20_I_elektrotechnika_zad.pdf",
 "2018-19":C+"E_18-19_I_elektrotechnika_zad.pdf","2017-18":C+"E_17-18_I_Elektrotechnika_zad.pdf",
 "2016-17":C+"E_16-17_I_zad.pdf","2015-16":C+"E_15-16_I_zad.pdf","2014-15":C+"E_14-15_I_e_z.pdf",
 "2013-14":C+"E_13-14_I_e_z.pdf","2012-13":C+"E_12-13_I_e_z.pdf","2011-12":C+"E_11-12_I_e_z.pdf",
 "2010-11":C+"E_10-11_I_e_z_o.pdf","2009-10":C+"E_09-10_I_z i o.pdf",
}
STOP=re.compile(r"(Prawidłowe odpowiedzi|Komitet|Rada Naukowa|Autorzy|Opracowa|Klucz odpowiedzi|Odpowiedzi do zadań|dr inż|Przewodnicz)",re.I)
FOOT=re.compile(r"(Strona\s*\d|^\s*\d+\s*$|zawody I stopnia \(|^\s*\d+\s*z\s*\d+\s*$)",re.I)
def lines(page):
    out=[]
    for b in page.get_text("dict")["blocks"]:
        for l in b.get("lines",[]):
            t="".join(s["text"] for s in l["spans"]).strip()
            if t: out.append((l["bbox"],t,l["spans"]))
    return out
def trim(im):
    bg=Image.new(im.mode,im.size,(255,255,255)); d=ImageChops.difference(im,bg).convert("L").point(lambda p:255 if p>18 else 0)
    bb=d.getbbox(); 
    if not bb: return None
    x0,y0,x1,y1=bb; return im.crop((max(0,x0-14),max(0,y0-10),min(im.width,x1+14),min(im.height,y1+10)))
meta={}
for ed,path in (ED.items() if __name__=="__main__" else []):
    doc=pymupdf.open(path); starts=[]; stopat=None; contentbottom={}; contenttop={}
    old = ed=="2009-10"
    for pi,page in enumerate(doc):
        H=page.rect.height
        ls=lines(page)
        body=[(bb,t) for bb,t,_ in ls if not (bb[1]>H-70 and FOOT.search(t)) and not (bb[1]<95 and re.search(r"EUROELEKTRA|Olimpiada|Rok szkolny|Zadania dla grupy|Organizatorzy|Stowarzyszenie|Oddział|Wydział",t,re.I)) ]
        if body:
            contentbottom[pi]=max(bb[3] for bb,_ in body); contenttop[pi]=min(bb[1] for bb,_ in body)
        for bb,t,sp in ls:
            if stopat is None and STOP.search(t) and pi>0: stopat=(pi,bb[1]); 
            m=re.match(r"^Zadanie\s*(?:nr\.?\s*)?(\d+)",t,re.I)
            if old:
                m2=re.match(r"^(\d{1,2})\b",t)
                if m2 and bb[0]<90 and int(m2.group(1))==len(starts)+1: starts.append((pi,bb[1],int(m2.group(1))))
            elif m and (int(m.group(1))==len(starts)+1 or (len(starts)==15 and int(m.group(1))>15)): starts.append((pi,bb[1],len(starts)+1))
    zoom=2.2; res=[]
    for k,(pi,y,n) in enumerate(starts):
        end = starts[k+1][:2] if k+1<len(starts) else (stopat if stopat else (len(doc)-1, contentbottom.get(len(doc)-1,doc[-1].rect.height)+4))
        if stopat and (end[0]>stopat[0] or (end[0]==stopat[0] and end[1]>stopat[1])): end=stopat
        segs=[]; p=pi; ys=y-1
        while True:
            page=doc[p]; H=page.rect.height
            if p==end[0]:
                ey=end[1]; bots=[bb[3] for bb,t,_ in lines(page) if bb[1]<ey-2 and bb[3]<ey+9]
                ye=min(max(bots)+1, ey+8) if bots else ey-3
            else:
                ft=[bb[1] for bb,t,_ in lines(page) if (bb[1]>H-110 and re.search(r'Strona|zawody I stopnia \(',t)) or (bb[1]>H-45 and FOOT.search(t))]+[dr['rect'].y0 for dr in page.get_drawings() if dr['rect'].y0>H-110 and dr['rect'].width>250]
                ye=(min(ft)-3) if ft else H-30
            if ye>ys+8: segs.append((p,ys,ye))
            if p>=end[0]: break
            p+=1; ys=min(contenttop.get(p,40), min([i['bbox'][1] for i in doc[p].get_image_info()]+[999]), min([dr['rect'].y0 for dr in doc[p].get_drawings() if dr["rect"].y0>20]+[999]))-14
        ims=[]
        for p,a,b in segs:
            page=doc[p]; clip=pymupdf.Rect(20,a,page.rect.width-20,b)
            pix=page.get_pixmap(matrix=pymupdf.Matrix(zoom,zoom),clip=clip)
            im=Image.frombytes("RGB",(pix.width,pix.height),pix.samples); im=trim(im)
            if im: ims.append(im)
        if not ims: print("EMPTY",ed,n); continue
        W=max(i.width for i in ims); Ht=sum(i.height for i in ims)
        canvas=Image.new("RGB",(W,Ht),"white"); yy=0
        for i in ims: canvas.paste(i,(0,yy)); yy+=i.height
        fn=f"{ed}-{n:02d}.png"; canvas.save(f"{OUT}/{fn}",optimize=True); res.append(n)
    meta[ed]=len(res); print(ed,len(res),"stop",stopat)
json.dump(meta,open("/home/claude/eebuild/meta.json","w"))
