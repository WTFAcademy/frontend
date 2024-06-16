import os
import sys

def find_readme_files(folder):
    readme_files = []
    for root, dirs, files in os.walk(folder):
        for file in files:
            if file.lower() == "readme.md":
                readme_files.append(os.path.join(root, file))
    return readme_files


if __name__ == '__main__':
    folder = os.curdir
    files = find_readme_files(folder)
    # print(files)

    insert_before="<LessonProcess meta={require('./meta.json')} />"
    append_text="<LessonQuizStart meta={require('./meta.json')} />"
    insert_before_target="我最近在重新学"
    
    for file in files:
        with open(file,'r') as fd:
            lines = fd.readlines()
        # Flag
        change = False

        for i in range(len(lines)):
            if insert_before_target in lines[i]:
                change = True
                lines[i] = lines[i].replace(insert_before_target,"{}\n\n{}".format(
                    insert_before,
                    insert_before_target
                ))
                break

        if change:
            lines.append("\n{}".format(append_text))
            with open(file, 'w') as fd:
                fd.writelines(lines)