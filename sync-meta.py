import os
import sys

file = sys.argv[1]

insert_before="<LessonProcess meta={require('./meta.json')} />"
append_text="<LessonQuizStart meta={require('./meta.json')} />"
insert_before_target="我最近在重新学"

with open(file,'r') as fd:
    lines = fd.readlines()

for i in range(len(lines)):
    if insert_before_target in lines[i]:
        lines[i] = lines[i].replace(insert_before_target,"{}\n\n{}".format(
            insert_before,
            insert_before_target
        ))
        break

lines.append("\n{}".format(append_text))

with open(file, 'w') as fd:
    fd.writelines(lines)