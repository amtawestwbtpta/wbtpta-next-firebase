// utils/sitemap.ts
export async function GET() {
  const baseUrl = "https://awwbtpta.vercel.app";
  const pages = [
    "AddTeacher",
    "admindashboard",
    "adminUploadFile",
    "adminUploadImage",
    "agecalculator",
    "api",
    "ChangePhoto",
    "ChangeUserImage",
    "complain",
    "daarrearcalculation",
    "dashboard",
    "displaycomplain",
    "displaydatabase",
    "downloadOsmsPayslip",
    "downloads",
    "downloadWBTPTAPayslip",
    "EditTeacher",
    "findteacher",
    "FlexibleComp",
    "FloodRelief",
    "forgotPassword",
    "Form16",
    "Form16New",
    "Form16Prev",
    "gpwiseschool",
    "GPWiseTeacher",
    "HolisticPRCardAny",
    "HRADeclaration",
    "imageUpload",
    "IncomeTaxReloded",
    "ITSection",
    "JulySalary",
    "LeaveProposal",
    "LeaveProposalNew",
    "login",
    "logout",
    "MemoSection",
    "MonthlyAWSalary",
    "monthlyDAArrear",
    "Notification",
    "paysliposmsNew",
    "payslipwbtpta",
    "payslipwbtptaNew",
    "PrintQuestionAll",
    "PrintQuestionAllCompact",
    "printquestioninvoice",
    "QuestionRequisition",
    "questionsec",
    "Retirement",
    "RetirementCalculator",
    "Ropa2019",
    "schoolteacherdata",
    "SchoolTeacherDataUnlog",
    "signup",
    "sitemap.xml",
    "taxcalculator",
    "teacherAddress",
    "teacherdatabase",
    "TeacherDatabaseUnlog",
    "TeacherPhotoCorner",
    "TeacherSelection",
    "TeacherServiceLife",
    "TechersAccuitance",
    "techsalary",
    "updateunp",
    "update_self",
    "ViewDetails",
    "YearWiseTeachers",
  ]; // Add actual paths

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}/${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
