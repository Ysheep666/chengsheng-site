from pathlib import Path
import hashlib,json,re,subprocess
from html.parser import HTMLParser
root=Path('/Users/xyz/ABC/chengsheng-site')
md=(root/'DESIGN.md').read_text();parts=md.split('---',2)
assert len(parts)==3
parsed=subprocess.run(['ruby','-ryaml','-rjson','-e','puts JSON.generate(YAML.safe_load(STDIN.read))'],input=parts[1],text=True,capture_output=True,check=True)
tokens=json.loads(parsed.stdout);side=json.loads((root/'.impeccable/design.json').read_text());css=(root/'site.css').read_text()
assert re.findall(r'^## (.+)$',md,re.M)==['Overview','Colors','Typography','Layout','Elevation & Depth','Shapes','Components',"Do's and Don'ts"]
assert side['schemaVersion']==2
assert set(tokens)<= {'name','description','colors','typography','rounded','spacing','components'}
allowed={'backgroundColor','textColor','typography','rounded','padding','size','height','width'}
for name,component in tokens['components'].items():
 assert set(component)<=allowed,name
 for value in component.values():
  if isinstance(value,str):
   for ref in re.findall(r'\{([^}]+)\}',value):
    cur=tokens
    for key in ref.split('.'):cur=cur[key]
for value in tokens['colors'].values():assert value in css,value
variables=set(re.findall(r'(--[\w-]+)\s*:',css))
class SnippetParser(HTMLParser):
 def __init__(self):super().__init__();self.ids=set();self.refs=[];self.classes=[]
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if 'id' in attrs:self.ids.add(attrs['id'])
  self.classes+=attrs.get('class','').split()
  for prop in ['aria-describedby','aria-labelledby']:
   self.refs+=attrs.get(prop,'').split()
  assert tag not in ['script','img'],tag
for c in side['components']:
 assert c['refersTo'] in tokens['components'],c['refersTo']
 p=SnippetParser();p.feed(c['html'])
 assert all(cl.startswith('ds-') for cl in p.classes),c['name']
 assert set(p.refs)<=p.ids,c['name']
 assert all(v in variables for v in re.findall(r'var\(\s*(--[\w-]+)',c['css'])),c['name']
 assert all('.'+cl in c['css'] for cl in p.classes),c['name']
prov=side['extensions']['provenance']
for name,expected in prov['sourceFiles'].items():assert hashlib.sha256((root/name).read_bytes()).hexdigest()==expected,name
for file in prov['visualEvidence']:assert (root/file).is_file(),file
for rule in side['narrative']['dos']+side['narrative']['donts']:assert rule in md,rule
assert side['narrative']['northStar'] in md
assert len(side['components'])==10
assert '只生成 /tmp 草稿' not in prov['scope']
assert '输入设为只读' in md
print('PASS: formal DESIGN / sidecar schema, 10 components, token references, source colors, CSS variables, ARIA references, 7 source hashes and permanent screenshots')
