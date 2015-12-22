# -*- coding: utf-8 -*-

import os
import sys
import time

from jinja2 import Environment, loaders
from jinja2._compat import PYPY, PY2
from jinja2.loaders import split_template_path

def filesystem_loader():
  '''returns FileSystemLoader initialized to templates directory
  '''
  here = os.path.dirname(os.path.abspath(__file__))
  print(here)
  return loaders.FileSystemLoader(here + '/templates')

def _get_root_path():
  here = os.path.dirname(os.path.abspath(__file__))
  return os.path.abspath(os.path.join(here, os.pardir))

def _get_template_path():
  here = os.path.dirname(os.path.abspath(__file__))
  return os.path.abspath(os.path.join(here, "templates"))

def _get_anli_path():
  here = os.path.dirname(os.path.abspath(__file__))
  return os.path.abspath(here)

def _is_shouye(name):
  return (name.split('_')[-1].find("shouye") is not -1)

# Convert "keji" to "科技"
def _get_fengge_name(k):
  return {
    "keji": u"科技",
    "xiandai": u"现代",
    "dating": u"大厅",
    "zhongshi": u"中式",
    "xieshi": u"写实",
    "qita": u"其他"
  }.get(k, None)

# e.g. "keji" or "xiandai"
def _get_fengge_key(anli_dir_name):
  return anli_dir_name.split('_')[1]

# dic = {
#   "fengge_key": {
#     "fengge_name": "科技",
#     "item_list": [
#       "keji_01_01"
#     ],
#     "shouye_list": [
#       "keji_02_01_shouye"
#     ]
#   }
# }
def _append_fengge_dict(dic, anli_dir_name):

  fengge_key = _get_fengge_key(anli_dir_name)
  fengge_name = _get_fengge_name(fengge_key)
  if fengge_name is None:
    print("[Error] Failed to get fengge name in anli name: " + anli_dir_name)
    return False

  if fengge_key not in dic:
    dic[fengge_key] = {}
    dic[fengge_key]["name"] = fengge_name
    dic[fengge_key]["item_list"] = []
    dic[fengge_key]["shouye_list"] = []

  dic[fengge_key]["item_list"].append(anli_dir_name)
  if _is_shouye(anli_dir_name):
    dic[fengge_key]["shouye_list"].append(anli_dir_name)

def _is_anli_dir(name):
  # Only accept dir.
  if not os.path.isdir(os.path.join(ROOT_DIR, name)):
    return False
  # Name validation
  if name.find('_') is -1:
    return False
  return True

ROOT_DIR = _get_root_path()
TEMPLATE_DIR = _get_template_path()
ANLI_DIR = _get_anli_path()

# Meta data for single html page.
META = {
  "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
}

# fengge_dict = {
#   "keji": {
#     "name": "科技",
#     "item_list": [
#       "keji_01_01",
#       "keji_01_02"
#     ],
#     "shouye_list": [
#       "keji_02_01_shouye",
#       "keji_02_02_shouye"
#     ]
#   }
# }

# Loop anli dir to sort them.
fengge_dict = {}
for name in os.listdir(ROOT_DIR):
  # Exclude not anli.
  if not _is_anli_dir(name):
    print ("[Warning] Not anli: " + name)
    continue

  # Dir name is anli name.
  anli_dir_name = name

  _append_fengge_dict(fengge_dict, anli_dir_name)

#env = Environment(loader=filesystem_loader)
env = Environment(loader=loaders.FileSystemLoader(TEMPLATE_DIR))
tmpl_more = env.get_template('more.html')
tmpl_index = env.get_template('index.html')

# One fengge one html page, more.html
for fengge_key, fengge_item in fengge_dict.iteritems():

  if fengge_key == "":
    continue

  item_list = fengge_item["item_list"]

  render_data = {
    "html_title": u"3D展厅模板 - ",#TODO + fengge_item["name"].encode('utf8'),
    "item_list": item_list,
    "count": len(item_list),
    "meta": META
  }

  output = tmpl_more.render(data = render_data).encode('utf8')
  
  # to save the results
  more_html = os.path.join(ANLI_DIR, "more-" + fengge_key + ".html")
  with open(more_html, "wb") as fh:
    fh.write(output)

# front page
render_data = {
  "html_title": u"3D展厅模板 - 首页",
  "fengge_dict": fengge_dict,
  "meta": META
}
output = tmpl_index.render(data = render_data).encode('utf8')
index_html = os.path.join(ANLI_DIR, "index.html")
with open(index_html, "wb") as fh:
  fh.write(output)
