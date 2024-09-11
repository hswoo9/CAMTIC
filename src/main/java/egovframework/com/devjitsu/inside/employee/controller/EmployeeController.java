package egovframework.com.devjitsu.inside.employee.controller;

import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.CssAppliers;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.employee.service.EmployService;
import egovframework.com.devjitsu.inside.salary.service.SalaryManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private EmployService employService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private SalaryManageService salaryManageService;

    @Autowired
    private CommonService commonService;

    @Value("#{properties['File.Server.Dir']}")
    private String serverDir;

    @Value("#{properties['File.Base.Directory']}")
    private String baseDir;

    //참여율신청목록
    @RequestMapping("/inside/participationRateList.do")
    public String participationRateList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/participationRateList";
    }

    @RequestMapping("/project/getPartRateVersionList")
    public String getProjectList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String,Object>> list = projectService.getPartRateVersionList(params);

        model.addAttribute("list", list);


        return "jsonView";
    }

    //직원별참여현황
    @RequestMapping("/Inside/employeeParticipationList.do")
    public String employeeParticipationList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/employeeParticipationList";
    }

    @RequestMapping("/inside/userPartRateList")
    public String userPartRateList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = employService.getUserPartRateList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    //사업별참여현황
    @RequestMapping("/inside/businessParticipationList.do")
    public String businessParticipationList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/businessParticipationList";
    }

    @RequestMapping("/inside/getBusinessParticipationList")
    public String getBusinessParticipationList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = employService.getBusinessParticipationList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    //월별급여지급현황
    @RequestMapping("/Inside/monthlyPayList.do")
    public String monthlyPayList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        session.setAttribute("menuNm", request.getRequestURI());

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/monthlyPayList";
    }

    //인건비현황
    @RequestMapping("/Inside/laborList.do")
    public String laborList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        session.setAttribute("menuNm", request.getRequestURI());

        if(login == null){
            return "error/error";
        }
        
        return "inside/userManage/laborList";
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

    @RequestMapping("/inside/pop/busnPartRate.do")
    public String popBusnPartRate(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/userManage/popBusnPartRate";
    }

    @RequestMapping("/inside/getBusinessParticipationData")
    public String getBusinessParticipationData(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = employService.getBusinessParticipationData(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/inside/getBusnPartRatePayData")
    public String getBusnPartRatePayData(@RequestParam Map<String, Object> params, Model model) {

        Map<String, Object> map = new HashMap<>();
        map = employService.getBusnPartRatePayData(params);
        if(map != null && !map.isEmpty()) {
            model.addAttribute("map", map);
        }

        return "jsonView";
    }
    @RequestMapping("/inside/setBusnPartRatePay")
    public String setBusnPartRatePay(@RequestParam Map<String, Object> params, Model model) {

        try{
            employService.setBusnPartRatePay(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/inside/getCalcPartRate")
    public String getCalcPartRate(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", employService.getCalcPartRate(params));
        model.addAttribute("list2", salaryManageService.getPayRollLedgerStatusList(params));
        return "jsonView";
    }

    @RequestMapping("/inside/getMonthlyCalcPartRate")
    public String getMonthlyCalcPartRate(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("deptList", employService.getDeptList(params));
        model.addAttribute("list", employService.getMonthlyCalcPartRate(params));
        model.addAttribute("list2", employService.getMonthlyPayRollLedgerList(params));
        return "jsonView";
    }

    @RequestMapping("/inside/getPartRateEmpPayrollList")
    public String getPartRateEmpPayrollList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", employService.getPartRateEmpPayrollList(params));
        return "jsonView";
    }

    @RequestMapping("/inside/getG20ProejctList")
    public String getG20ProejctList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", employService.getG20ProejctList(params));
        return "jsonView";
    }

    @RequestMapping("/inside/makePayrollPdf")
    public String makePayrollPdf(@RequestParam Map<String, Object> params, Model model) {
        createPdf(params);
        return "jsonView";
    }

    @RequestMapping("/inside/getPayRollFileList")
    public String getPayRollFileList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> fileList = new ArrayList<>();
        params.put("fileCd", "payroll");

        for(String ym : params.get("payRollYm").toString().split(",")){
            params.put("contentId", "payroll_" + params.get("pjtSn") + "_" + ym.replaceAll("-", ""));
            for(Map<String, Object> tempMap : commonService.getFileList(params)){
                fileList.add(tempMap);
            }
        }

        model.addAttribute("fileList", fileList);
        return "jsonView";
    }

    public void createPdf(Map<String, Object> params) {
        Document document = new Document(PageSize.A4.rotate(), 20, 20, 20, 20);

        try {
            // PDF 파일 생성
            String fileUUID = UUID.randomUUID().toString();
            String fileOrgName = "급여대장 (" + params.get("bsYm").toString() + ")";
            String fileCd = "payroll";
            String fileExt = "pdf";
            String htmlContents = params.get("htmlContents").toString();

            params.put("menuCd", fileCd);
            String filePathTxt = filePath(params, serverDir);

            // PDF 생성을 위한 OutputStream 생성
            File f = new File(filePathTxt);
            if(!f.exists()) {
                f.mkdirs();
            }

            PdfWriter pdfWriter = PdfWriter.getInstance(document, new FileOutputStream(filePathTxt + fileUUID + "." + fileExt));
            // PDF 파일 열기
            document.open();

            String htmlStr = "<html><body style='font-family: gulim;'>"+ htmlContents +"</body></html>";

            XMLWorkerHelper helper = XMLWorkerHelper.getInstance();

            CSSResolver cssResolver = new StyleAttrCSSResolver();

            XMLWorkerFontProvider fontProvider = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
            fontProvider.register("/egovframework/fonts/gulim.ttf", "gulim"); //MalgunGothic은 font-family용 alias

            CssAppliers cssAppliers = new CssAppliersImpl(fontProvider);
            HtmlPipelineContext htmlContext = new HtmlPipelineContext(cssAppliers);
            htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());

            // html을 pdf로 변환시작
            PdfWriterPipeline pdf = new PdfWriterPipeline(document, pdfWriter);
            HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
            CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);

            XMLWorker worker = new XMLWorker(css, true);
            //캐릭터 셋 설정
            XMLParser xmlParser = new XMLParser(worker, Charset.forName("UTF-8"));

            StringReader strReader = new StringReader(htmlStr);
            xmlParser.parse(strReader);

            document.close();
            pdfWriter.close();

            Map<String, Object> fileParameters = new HashMap<>();
            fileParameters.put("fileCd", fileCd);
            fileParameters.put("fileUUID", fileUUID+"."+fileExt);
            fileParameters.put("fileOrgName", fileOrgName);
            fileParameters.put("filePath", filePath(params, baseDir));
            fileParameters.put("fileExt", fileExt);
            fileParameters.put("fileSize", 99);
            fileParameters.put("contentId", "payroll_" + params.get("pjtSn") + "_" + params.get("bsYm").toString().replaceAll("-", ""));
            fileParameters.put("empSeq", "1");

            // 이전에 저장한 파일 삭제
            commonService.delContentFileOne(fileParameters);
            // DB에 데이터 저장
            commonService.insFileInfoOne(fileParameters);

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }
}
