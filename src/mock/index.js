import Mock from "mockjs";
import banner from './banner.json'
Mock.setup({
  // 延迟时间200毫秒
  timeout: 200,
});


// 生成subjects、grades数据
const { subjects, grades } = Mock.mock({
  "grades|3": [{
    // 属性 GradeId 是一个自增数，起始值为 1，每次增 1
    'GradeId|+1': 1,
    // @cname 随机生成一个常见的中文姓名。
    "GradeName": '@cname'
  }],
  // 随机生成一个5到10条的数组
  // 属性 subjects 的值是一个数组，其中含有 5 到 10 个元素
  "subjects|5-10": [{
    'SubjectId|+1': 1,
    // @ctitle 随机生成一句中文标题。
    SubjectName: '@ctitle(10,15)',
    // @integer( min, max )返回一个随机的整数。min最小值,max最大值
    ClassHour: '@integer(22,80)',
    GradeId: '@integer(1,3)',
  }]
});
// 给课程数组添加年级信息
subjects.forEach(r => {
  // 给每个课程信息，添加一个年级的完整信息
  r.Grade = {
    GradeId: r.GradeId,
    GradeName: grades.find(g => g.GradeId == r.GradeId).GradeName
  }
});

Mock.mock('/banner', {code:'200',data:banner});

// 拦截查询所有年级信息的请求
Mock.mock('http://bluehub.com:81/Grade/GetAll', "get", () => {
  return grades;
});

// 拦截查询所有课程信息的请求
Mock.mock('http://bluehub.com:81/Subject/GetAll', "get", () => {
  return subjects;
});

// 拦截添加请求
Mock.mock('http://bluehub.com:81/Subject/Add', "post", (options) => {
  // 获取参数数据
  let obj = JSON.parse(options.body)
  let subject = {
    // 课程编号
    SubjectId: Date.now(),
    SubjectName: obj.subjectName,
    ClassHour: obj.classHour,
    GradeId: obj.gradeId
  }
  subject.Grade = Mock.mock({
    GradeId: subject.GradeId,
    GradeName: grades.find(g => g.GradeId == subject.GradeId).GradeName
  })
  subjects.push(subject)
  return true
});

// 拦截删除请求
Mock.mock('http://bluehub.com:81/Subject/Delete', "post", (options) => {
  // 获取课程编号
  let subjectId = JSON.parse(options.body)
  // 获取课程在数组中的位置
  let index = subjects.findIndex(r => r.SubjectId == subjectId)
  // 删除
  subjects.splice(index, 1)
  return true
});

// 拦截查询单个课程信息请求
Mock.mock('http://bluehub.com:81/Subject/GetSubjectById', "get", (options) => {
  // 获取课程编号
  let id = options.url.split("?")[1].split("=")[1]
  // 根据课程编号查询指定的课程信息
  let subject = subjects.find(r => r.SubjectId == id)
  return subject
})

// 拦截修改课程信息请求
Mock.mock('http://bluehub.com:81/Subject/Update', "post", (options) => {
  let { subjectId, subjectName, classHour, gradeId } = JSON.parse(options.body)
  let index = subjects.findIndex(r=>r.SubjectId==subjectId)
  subjects[index].SubjectName = subjectName
  subjects[index].ClassHour = classHour
  subjects[index].GradeId = gradeId
  subjects[index].Grade.GradeId = gradeId
  subjects[index].Grade.GradeName=grades.find(g => g.GradeId == gradeId).GradeName
  return true
});
