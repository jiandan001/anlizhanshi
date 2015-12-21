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

item_list = []
for item in os.listdir("../"):
  if item.find("_") is not -1:
    item_list.append(item.encode('utf8'))

data = {
  "html_title": u"3D展厅模板",
  "item_list": item_list,
  "count": len(item_list)
}

#env = Environment(loader=filesystem_loader)
env = Environment(loader=loaders.FileSystemLoader('templates'))
tmpl = env.get_template('more.html')
output = tmpl.render(data = data)

# to save the results
with open("more.html", "wb") as fh:
  fh.write(output.encode('utf8'))
