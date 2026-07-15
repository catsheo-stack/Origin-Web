export function translateScore(score) {
  const names = {
    "Deposit Strength":"首期資金充足度", "Buying Cost Buffer":"購屋成本緩衝",
    "Emergency Savings After Settlement":"交割後緊急備用金", "Repayment-to-Income Ratio":"還款佔收入比例",
    "Existing Debt Commitments":"現有債務負擔", "Loan-to-Value Ratio":"貸款價值比"
  };
  const grades={Excellent:"非常良好",Good:"良好",Fair:"一般","Needs Attention":"需要改善"};
  return {...score, grade: grades[score.grade]||score.grade, components: score.components.map(c=>({...c,name:names[c.name]||c.name, explanation: translateText(c.explanation)}))};
}
export function translateRealityCheck(rc){ return {...rc, checks: rc.checks.map(x=>({...x,text:translateText(x.text)})), recommendation:translateText(rc.recommendation)}; }
export function translateText(t=''){
 return t
 .replace("Deposit appears healthy — you're at or above 20% of the purchase price.","首期資金較充足，已達樓價的 20% 或以上。")
 .replace(/Your deposit is ([\d.]+)% of the purchase price. Lenders Mortgage Insurance may apply below 20%./,"您的首期為樓價的 $1%。低於 20% 時可能需要支付貸款機構按揭保險。")
 .replace("Your deposit is below 10%, which significantly increases borrowing costs and lender risk.","首期低於 10%，可能明顯增加借貸成本及貸款風險。")
 .replace("Your selected deposit and estimated buying costs are covered by your available funds.","您的可用資金足以支付所選首期及預估購屋成本。")
 .replace("Your available funds may not fully cover your selected deposit and estimated buying costs.","您的可用資金可能不足以支付所選首期及預估購屋成本。")
 .replace(/Monthly repayments are approximately ([\d.]+)% of household income — within a comfortable range./,"每月還款約佔家庭收入的 $1%，處於較可承受範圍。")
 .replace(/Monthly repayments may consume approximately ([\d.]+)% of household income./,"每月還款可能佔家庭收入約 $1%。")
 .replace(/Emergency savings after settlement cover approximately ([\d.]+) months of expenses./,"交割後的緊急備用金約可支付 $1 個月的生活開支。")
 .replace("Emergency savings after settlement are limited.","交割後的緊急備用金較有限。")
 .replace("Little to no cash remains after settlement — consider building an emergency buffer first.","交割後幾乎沒有剩餘現金，建議先建立緊急備用金。")
 .replace("Positive","正數").replace("Negative","負數").replace("Neutral","持平")
 .replace("Deposit appears healthy.","首期資金狀況良好。")
 .replace("Buying costs have been considered.","已把購屋成本納入考量。")
 .replace("Emergency savings buffer looks healthy.","緊急備用金較充足。")
 .replace("Estimated repayments appear manageable.","預估還款金額較可承受。")
 .replace("Existing debts are manageable.","現有債務負擔較可控。")
 .replace("Loan-to-value ratio is within a good range.","貸款價值比處於較理想範圍。")
 .replace("Consider increasing your deposit.","可考慮增加首期資金。")
 .replace("Ensure buying costs are fully covered.","請確保有足夠資金支付全部購屋成本。")
 .replace("Build a larger emergency buffer.","建議建立較充足的緊急備用金。")
 .replace("Consider a slightly lower purchase budget to improve flexibility.","可考慮稍微降低購屋預算，以增加財務彈性。")
 .replace("Reduce existing debts where possible.","可行時先減少現有債務。")
 .replace("Aim for a higher deposit to improve your LVR.","提高首期可改善貸款價值比。")
 .replace("Excellent","非常良好").replace("Good","良好").replace("Fair","一般").replace("Needs Attention","需要改善");
}
