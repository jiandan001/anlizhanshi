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

ROOT_DIR = _get_root_path()
TEMPLATE_DIR = _get_template_path()
ANLI_DIR = _get_anli_path()

# Meta data for single html page.
META = {
  "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
}

# fengge_list = {
#   "keji": [
#     "keji_01_01",
#     "keji_01_02"
#   ],
#   "xiandai": [
#     "xiandai_01_01",
#     "xiandai_01_02"
#   ]
# }

# Loop anli dir to sort them.
item_list = []
fengge_dict = {}
for item in os.listdir(ROOT_DIR):
  if item.find('_') is -1:
    continue
  tag_list = item.split('_')
  fengge = tag_list[0]

  item_list.append(item.encode('utf8'))

  if fengge in fengge_dict:
    fengge_x_list = fengge_dict[fengge]
  else:
    fengge_x_list = []
  fengge_x_list.append(item)
  fengge_dict[fengge] = fengge_x_list

#env = Environment(loader=filesystem_loader)
env = Environment(loader=loaders.FileSystemLoader(TEMPLATE_DIR))
tmpl = env.get_template('more.html')

# One fengge one html page.
for fengge, item_list in fengge_dict.iteritems():

  if fengge == "":
    continue

  render_data = {
    "html_title": u"3D展厅模板 - " + fengge,
    "item_list": item_list,
    "count": len(item_list),
    "meta": META
  }

  output = tmpl.render(data = render_data).encode('utf8')
  
  # to save the results
  more_html = os.path.join(ANLI_DIR, "more-" + fengge + ".html")
  with open(more_html, "wb") as fh:
    fh.write(output)
