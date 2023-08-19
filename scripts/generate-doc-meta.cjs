const axios = require("axios");
const path = require("path");
const fs = require("fs");
const glob = require("glob");

const courseMap = {
    // "solidity-start":  "e1faa656-8c53-45f4-bb4f-950db92bee60",
    "solidity-advanced": "d6a7f8b4-dc00-45d4-888b-79a3d16529ca",
}

const getLessons = async (courseId) => {
    const res = await axios.get(`https://api.wtf.academy/courses/${courseId}/lessons`);
    return res.data;
}

const getDocCoursePath = (courseName) => {
    return path.resolve(__dirname, `../docs/${courseName}`);
}

const getDocLessonsPath = (courseName, lessonName) => {
    return path.resolve(__dirname, `../docs/${courseName}/${lessonName}`);
}
// const getDocLessonsPath = (courseName) => {
//     const folders = glob.sync(path.resolve(__dirname, `../docs/${courseName}/*/`));
//     return folders.filter((folder) => {
//         const folderPath = path.join(folder, "*");
//         try {
//             const files = glob.sync(folderPath);
//             return files.length > 0;
//         } catch (error) {
//             return false;
//         }
//     });
// }

const main = async () => {
    const courseKeys = Object.keys(courseMap);
    const coursePromises = courseKeys.map(key => {
        return getLessons(courseMap[key]).then(res => res.data.list);
    });
    const courseLessonGroup = await Promise.all(coursePromises);
    console.log(courseLessonGroup)
    courseKeys.forEach((courseKey, index) => {
        const courseLessons = courseLessonGroup[index];
        const coursePath = getDocCoursePath(courseKey);
        const courseMetaPath = path.resolve(coursePath, 'meta.json');
        if (!fs.existsSync(courseMetaPath)) {
            fs.writeFileSync(courseMetaPath, JSON.stringify({courseId: courseMap[courseKey]}, null, 4));
        }

        courseLessons.forEach((lesson, idx) => {
            console.log(lesson.route_path);
            const lessonName = (idx + 1) + '_' + lesson.route_path.split('/')[1]
            console.log(lessonName);
            const lessonPath = path.resolve(__dirname, `../i18n/en/docusaurus-plugin-content-docs-solidity-advanced/current/${lessonName}`);
            const lessonMetaPath = path.resolve(lessonPath, 'meta.json');
            console.log(lessonMetaPath)
            if (fs.existsSync(lessonMetaPath)) {
                fs.rmSync(lessonMetaPath);
            }
            fs.writeFileSync(lessonMetaPath, JSON.stringify({
                course_id: courseMap[courseKey],
                lesson_id: lesson.lesson_id
            }, null, 4));
        })
    })
}

main();
