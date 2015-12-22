# -*- coding: utf-8 -*-

import os
import sys
import time
import json

from jinja2 import Environment, loaders
from jinja2._compat import PYPY, PY2
from jinja2.loaders import split_template_path

def filesystem_loader():
  '''returns FileSystemLoader initialized to templates directory
  '''
  here = os.path.dirname(os.path.abspath(__file__))
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

def _create_db(dic):
  with open(os.path.join(_get_anli_path(), 'db.json'), 'w') as f:
    json.dump(dic, f)

def _read_db():
  with open(os.path.join(_get_anli_path(), 'db.json')) as f:
    return json.load(f)

def _is_shouye(name):
  return (name.split('_')[-1].find("shouye") is not -1)

# Convert "keji" to "科技"
def _get_fengge_name(name):
  return _fengge_name_table(_get_fengge_key(name))

def _fengge_name_table(k):
  return {
    "keji": u"科技",
    "xiandai": u"现代",
    "dating": u"大厅",
    "zhongshi": u"中式",
    "xieshi": u"写实",
    "qita": u"其他"
  }.get(k, None)

def _is_anli_dir(name):
  # Only accept dir.
  if not os.path.isdir(os.path.join(ROOT_DIR, name)):
    return False
  # Name validation
  if name.find('_') is -1:
    return False
  return True

def _get_shouye_order(name):
  import re
  p = re.compile("shouye([0-9]+)")
  m = p.search(name)
  if m:
    return m.group(1)
  else:
    return "9999"

# e.g. "keji" or "xiandai"
def _get_fengge_key(anli_dir_name):
  return anli_dir_name.split('_')[1]

def _get_created_date(dir_name):
  (mode, ino, dev, nlink, uid, gid, size, atime, mtime, ctime) = os.stat(os.path.join(ROOT_DIR, dir_name))
  return ctime

ROOT_DIR = _get_root_path()
TEMPLATE_DIR = _get_template_path()
ANLI_DIR = _get_anli_path()

# Pager limit
LIMIT = 20

# Meta data for single html page.
META = {
  "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
}

# Parse dir to create a json database.
# [{
#   "id": "cx_xiandai_01_1",
#   "fengge_key": "xiandai",
#   "fengge_name": "XIANDAI",
#   "unix_ctime": "123",
#   "ctime": "2015..."
# }]
def _parse_dir():
  table = []
  for name in os.listdir(ROOT_DIR):
    # Exclude not anli.
    if not _is_anli_dir(name):
      print ("[Warning] Not anli: " + name)
      continue

    fengge_name = _get_fengge_name(name)
    if fengge_name is None:
      print("[Error] Failed to get fengge name in anli name: " + name)
      continue

    dir_created_unix_time = _get_created_date(name) # int
    dir_created_time = time.ctime(dir_created_unix_time)

    row = {
      "id": name,
      "fengge_name": fengge_name,
      "fengge_key": _get_fengge_key(name),
      "unix_ctime": dir_created_unix_time,
      "ctime": dir_created_time
    }

    if _is_shouye(name):
      row["shouye_order"] = _get_shouye_order(name)

    table.append(row)
  
  return table

dic = _parse_dir()
_create_db(dic)

# Read data from database
anli_table = _read_db()

# Hold data needed to be rendered in one list.
html_template_data = []

# Create index.html template render data.
# {
#   "html_title": "",
#   "fengge_dict": {
#     "keji": {
#       "name": "KEJI",
#       "list": [
#         ("cx_keji_01_1_shouye1", 1),
#         ("cx_keji_02_1_shouye2", 2)
#       ]
#     }
#   },
#   "meta": {}
# }
fengge_dict = {}

for anli in anli_table:
  if "shouye_order" not in anli:
    continue

  anli_dir_name = anli["id"]
  order = anli["shouye_order"]
  fengge_key = _get_fengge_key(anli_dir_name)

  # Create empty list when not exist.
  if fengge_key not in fengge_dict:
    fengge_dict[fengge_key] = {}
    fengge_dict[fengge_key]["name"] = anli["fengge_name"]
    fengge_dict[fengge_key]["list"] = []

  fengge = fengge_dict[fengge_key]
  fengge["list"].append(
    (anli_dir_name, order)
  )

  # Sort with order number
  fengge["list"] = sorted(fengge["list"], key=lambda anli: anli[1])

html_template_data.append({
  "file_name": "index.html",
  "template_name": "index.html",
  "render_data": {
    "html_title": u"3D展厅模板 - 首页",
    "fengge_dict": fengge_dict,
    "meta": META
  }
})

# [
#   ("cx_xiandai_01_1", 123, "2015..."),
#   ("cx_xiandai_01_1", 123, "2015...")
# ]
# SQL: select * from <table> where <field_name>=<field_value>
def _db_query(field_name, field_value, table):
  l = []
  for anli in anli_table:
    if anli[field_name] != field_value:
      continue
    l.append(
      (anli["id"], anli["unix_ctime"], anli["ctime"])
    )
  l = sorted(l, key=lambda item: item[1], reverse=True)
  return l

# [
#   "keji",
#   "xiandai"
# ]
def _db_group(field_name, table):
  l = []
  for anli in anli_table:
    field_value = anli[field_name]
    if field_value in l:
      continue
    l.append(field_value)
  return l

# Create more.html template render data.
# {
#   "html_title": "",
#   "item_list": {
#     "name": "KEJI",
#     "list": [
#       ("cx_keji_01_1", 123),
#       ("cx_keji_02_1", 234)
#     ]
#   },
#   "count": 45,
#   "option": {
#     "limit": 20
#   },
#   "meta": {}
# }
fengge_dict = {}

for fengge_key in _db_group("fengge_key", anli_table):
  anli_list = _db_query("fengge_key", fengge_key, anli_table)
  anli_count = len(anli_list)
  page_number = 1
  current_page_list = []
  current_anli_index = 1
  for anli in anli_list:
    anli_dir_name = anli[0]
    fengge_name = _get_fengge_name(anli_dir_name)
  
    dir_created_unix_time = _get_created_date(anli_dir_name) # int
    dir_created_time = time.ctime(dir_created_unix_time)
  
    current_page_list.append(
      # dir_name      # dir_created_date
      (anli_dir_name, dir_created_unix_time, str(dir_created_time))
    )

    if current_anli_index % LIMIT == 0 or current_anli_index == anli_count:
      file_name = "more-" + fengge_key + "-" + str(page_number) + ".html"
      html_template_data.append({
        "file_name": file_name,
        "template_name": "more.html",
        "render_data": {
          "html_title": u"3D展厅模板 - " + fengge_name,
          "item_list": current_page_list,
          "fengge_key": fengge_key,
          "current_page": page_number,
          "count": anli_count,
          "option": {
            "limit": LIMIT
          },
          "meta": META
        }
      })
      current_page_list = []
      page_number += 1

    current_anli_index += 1


#env = Environment(loader=filesystem_loader)
env = Environment(loader=loaders.FileSystemLoader(TEMPLATE_DIR))

for tpl_data in html_template_data:
  tmpl = env.get_template(tpl_data["template_name"])
  html_path = os.path.join(ANLI_DIR, tpl_data["file_name"])
  output = tmpl.render(data = tpl_data["render_data"]).encode('utf8')
  with open(html_path, "wb") as fh:
    fh.write(output)
