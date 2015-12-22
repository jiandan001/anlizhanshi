# -*- coding: utf-8 -*-

import os
import sys

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

item_list = []
for item in os.listdir(ROOT_DIR):
  if item.find("_") is -1:
    continue
  item_list.append(item.encode('utf8'))

data = {
  "html_title": u"3D展厅模板",
  "item_list": item_list,
  "count": len(item_list)
}

#env = Environment(loader=filesystem_loader)
env = Environment(loader=loaders.FileSystemLoader(TEMPLATE_DIR))
tmpl = env.get_template('more.html')
output = tmpl.render(data = data).encode('utf8')

# to save the results
more_html = os.path.join(ANLI_DIR, "more.html")
with open(more_html, "wb") as fh:
  fh.write(output)
