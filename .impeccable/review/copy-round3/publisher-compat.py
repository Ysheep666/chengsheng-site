import ast
import json
from pathlib import Path
source = Path('/Users/xyz/ABC/chengsheng/scripts/pack/publish.py')
tree = ast.parse(source.read_text())
needed = {'stamp_release', 'apply_download_links', '_zip_url', '_replace_href', '_file_name', '_fill_span', 'escape_text'}
subset = ast.Module(body=[node for node in tree.body if isinstance(node, (ast.Import, ast.ImportFrom)) or (isinstance(node, ast.FunctionDef) and node.name in needed)], type_ignores=[])
# Import only standard-library modules used by these pure transformation functions.
subset.body = [node for node in subset.body if not isinstance(node, (ast.Import, ast.ImportFrom))]
import re
import html
ns = {'re': re, 'json': json, 'html': html}
exec(compile(subset, str(source), 'exec'), ns)
original = Path('/Users/xyz/ABC/chengsheng-site/index.html').read_text()
feed = {'version': '0.0.8', 'file': 'https://github.com/Ysheep666/chengsheng-site/releases/download/app-v0.0.8/Chengsheng-0.0.8-arm64.zip', 'sha256': 'a' * 64}
updated = ns['apply_download_links'](ns['stamp_release'](original, '0.0.8', '发布验证说明'), json.dumps(feed))
assert '<span data-release>0.0.8</span>' in updated
assert '<p class="lede" data-release-notes>发布验证说明</p>' in updated
assert len(re.findall(r'data-download="dmg"[^>]*href="' + re.escape(feed['file'][:-3] + 'dmg') + '"', updated)) == 2
assert len(re.findall(r'data-download="zip"[^>]*href="' + re.escape(feed['file']) + '"', updated)) == 1
assert updated.count('<span data-file="zip">Chengsheng-0.0.8-arm64.zip</span>') == 1
assert '<span data-file="dmg">Chengsheng-0.0.8-arm64.dmg</span>' in updated
assert '<code data-checksum>' + 'a' * 64 + '</code>' in updated
assert '0.0.7' not in updated
assert Path('/Users/xyz/ABC/chengsheng-site/index.html').read_text() == original
print('PASS: actual publisher updates all versions, download links, filenames, hidden checksum and release notes; source unmodified')
