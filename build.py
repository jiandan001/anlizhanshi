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

#env = Environment(loader=filesystem_loader)
env = Environment(loader=loaders.FileSystemLoader('templates'))
tmpl = env.get_template('more.html')
output = tmpl.render()

# to save the results
with open("more.html", "wb") as fh:
  fh.write(output.encode('utf8'))
