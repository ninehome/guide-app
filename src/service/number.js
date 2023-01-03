import axios from "@/utils/axios";


export function formatNum  (v){
  const n = Number(v);
  if (!n) { return 0; }

  let counter = 0;
  // 处理小数点
  const int = n.toString().split('.');
  const num = int[0].split('');
  const result = int[1] ? [`.${int[1]}`] : [];
  for (let i = num.length - 1; i >= 0; i--) {
    counter++;
    result.unshift(num[i]);
    if (!(counter % 3) && i !== 0) {
      result.unshift(' ');
    }
  }
  return result.join('');
}



// export function getHome(params) {
//   return axios.get("/index-infos");
// }
