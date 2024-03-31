package egovframework.com.devjitsu.inside.recruit.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.camtic.repository.ApplicationRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.utiles.AESCipher;
import egovframework.com.devjitsu.doc.config.EgovFileScrty;
import egovframework.com.devjitsu.g20.repository.PRJRepository;
import egovframework.com.devjitsu.inside.recruit.repository.EvalManageRepository;
import egovframework.com.devjitsu.inside.recruit.repository.RecruitRepository;
import egovframework.com.devjitsu.inside.recruit.service.RecruitService;
import egovframework.com.devjitsu.inside.userManage.repository.UserManageRepository;
import egovframework.com.devjitsu.system.repository.MenuManagementRepository;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecruitServiceImpl implements RecruitService {

    @Autowired
    private UserManageRepository userManageRepository;

    @Autowired
    private MenuManagementRepository menuManagementRepository;

    @Autowired
    private RecruitRepository recruitRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private EvalManageRepository evalManageRepository;

    @Autowired
    private PRJRepository prjRepository;


    @Override
    public Map<String, Object> getRecruitNum(){
        return recruitRepository.getRecruitNum();
    }

    @Override
    public List<Map<String, Object>> getRecruitList(Map<String, Object> params) {
        List<Map<String, Object>> recruitList = recruitRepository.getRecruitList(params);
        if(recruitList.size() > 0){
            for(int i = 0 ; i < recruitList.size() ; i++){
                List<Map<String, Object>> recruitAreaList = recruitRepository.getRecruitAreaList(recruitList.get(i));
                //System.out.println("채용서비스 : " + recruitAreaList);
                if(recruitAreaList.size() > 0){
                    recruitList.get(i).put("recruitAreaList", recruitAreaList);
                }

                String careerType = recruitList.get(i).get("CAREER_TYPE") == null ? "" : recruitList.get(i).get("CAREER_TYPE").toString();
                if(!StringUtils.isEmpty(careerType)){
                    if(careerType.indexOf(",") > -1){
                        careerType = "신입~경력";
                    }else{
                        if("1".equals(careerType)){
                            careerType = "경력";
                        }else{
                            careerType = "신입";
                        }
                    }
                }
                recruitList.get(i).put("careerType", careerType);
            }
        }
        return recruitList;
    }

    @Override
    public Map<String, Object> getRecruit(Map<String, Object> params) {
        Map<String, Object> returnMap = recruitRepository.getRecruit(params);
        returnMap.put("recruitArea", recruitRepository.getRecruitAreaList(params));
        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getRecruitAreaList(Map<String, Object> params) {
        return recruitRepository.getRecruitAreaList(params);
    }

    @Override
    public Map<String, Object> getRecruitArea(Map<String, Object> params) {
        return recruitRepository.getRecruitArea(params);
    }

    @Override
    public Map<String, Object> getUserInfoByApplication(Map<String, Object> params) {
        return recruitRepository.getUserInfoByApplication(params);
    }

    @Override
    public List<Map<String, Object>> getCommissionerList(Map<String, Object> params) {
        return recruitRepository.getCommissionerList(params);
    }

    @Override
    public void setEvalEmpInfo(Map<String, Object> params) {
        userManageRepository.setUserReqDetailInsert(params);
        menuManagementRepository.setAuthorityGroupUser(params);
    }

    @Override
    public void setCommissionerEmpInfoDel(Map<String, Object> params) {
        recruitRepository.setCommissionerEmpInfoDel(params);
    }

    @Override
    public void evalSetExcelFormDown(HttpServletRequest request, HttpServletResponse response) {
        String localPath = "/downloadFile/";
        String fileName = "평가위원 등록 양식.xlsx";
        String viewFileNm = "평가위원 등록 양식.xlsx";
        File reFile = new File(request.getSession().getServletContext().getRealPath("/downloadFile/" + fileName));

        try {
            if (reFile.exists() && reFile.isFile()) {
                response.setContentType("application/octet-stream; charset=utf-8");
                response.setContentLength((int) reFile.length());
                String browser = getBrowser(request);
                String disposition = setDisposition(viewFileNm, browser);
                response.setHeader("Content-Disposition", disposition);
                response.setHeader("Content-Transfer-Encoding", "binary");
                OutputStream out = response.getOutputStream();
                FileInputStream fis = null;
                fis = new FileInputStream(reFile);
                FileCopyUtils.copy(fis, out);
                if (fis != null)
                    fis.close();
                out.flush();
                out.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Map<String, Object>> evalExcelUploadData(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception{
        List<Map<String, Object>> evalList = recruitRepository.getCommissionerList(params);
        MultipartFile fileNm = request.getFile("evalFile");
        File dest = new File(fileNm.getOriginalFilename());
        fileNm.transferTo(dest);

        XSSFRow row; // 로우값
        XSSFCell col1;// 서고
        XSSFCell col2;

        FileInputStream inputStream = new FileInputStream(dest);

        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
        XSSFSheet sheet = workbook.getSheetAt(0); // 첫번째 시트
        int rows = sheet.getPhysicalNumberOfRows();

        String sheetNm = workbook.getSheetName(0);

        List<Map<String, Object>> dataList = new ArrayList<>();

        Map<String, Object> evalMap = null;
        for (int i = 5; i < rows; i++) {
            evalMap = new HashMap<String, Object>();
            row = sheet.getRow(i);
            col1 = row.getCell(0);
            col2 = row.getCell(1);

            if (row != null) {
                if (cellValueToString(col1).equals("") || cellValueToString(col2).equals("")){
                    return dataList;
                } else {    // 각 행의 필수값인 1, 2열이 공란이 아닐때 진행
                    int cells = sheet.getRow(i).getPhysicalNumberOfCells();
                    evalMap.put("loginId", cellValueToString(row.getCell(0))); //임시아이디
                    evalMap.put("loginPassWd", cellValueToString(row.getCell(1))); //임시비밀번호
                    evalMap.put("empNameKr", cellValueToString(row.getCell(2))); //성명
                    evalMap.put("resRegisNum", cellValueToString(row.getCell(3))); //주민등록번호
                    evalMap.put("mobileTelNum", cellValueToString(row.getCell(4))); //휴대전화
                    evalMap.put("emailAddr", cellValueToString(row.getCell(5))); //전자우편
                    evalMap.put("deptName", cellValueToString(row.getCell(6))); //소속
                    evalMap.put("genderCode", cellValueToString(row.getCell(7))); //성별
                    evalMap.put("positionName", cellValueToString(row.getCell(8))); //직급(직책)
                    evalMap.put("significant", cellValueToString(row.getCell(9))); //비고
                }
            }
            dataList.add(evalMap);
        }

        try {

        } catch (Exception e) {
            e.getStackTrace();
        }
        dest.delete();
        inputStream.close();

        List<Map<String, Object>> finalList = new ArrayList<>();
        for(int j = 0; j < dataList.size(); j++){
            boolean flag = true;
            for(int i = 0; i < evalList.size(); i ++){
                if(evalList.get(i).get("LOGIN_ID").equals(dataList.get(j).get("loginId"))){
                    flag = false;
                }
            }

            if(flag){
                finalList.add(dataList.get(j));
            }
        }

        return finalList;
    }

    @Override
    public void setEvalExcelUploadData(Map<String, Object> params) throws Exception{
        Gson gson = new Gson();
        List<Map<String, Object>> empArr = gson.fromJson((String) params.get("empArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        for(Map<String, Object> map : empArr){
            String inputLoginId = map.get("LOGIN_ID").toString() + map.get("userIdSub1").toString() + map.get("userIdSub2").toString();
            Boolean completeKeyFlag = false;
            map.put("LOGIN_ID", AESCipher.AES128SCRIPT_Decode(inputLoginId, completeKeyFlag));
            map.put("LOGIN_PASSWD", passwordEncrypt(replacePasswd(AESCipher.AES128SCRIPT_Decode(map.get("LOGIN_PASSWD").toString(), completeKeyFlag))));
            map.put("loginId", map.get("LOGIN_ID"));

            userManageRepository.setUserReqDetailInsert(map);
            menuManagementRepository.setAuthorityGroupUser(map);
        }
    }

    @Override
    public List<Map<String, Object>> getEvalHistoryList(Map<String, Object> params) {
        return recruitRepository.getEvalHistoryList(params);
    }

    @Override
    public void setRecruitInsert(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> area = gson.fromJson((String) params.get("areaArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        // 1. 채용공고 저장 2. 모집분야 저장
        try {
            if(StringUtils.isEmpty(params.get("recruitInfoSn"))){
                recruitRepository.setRecruitInsert(params);
            }else{
                recruitRepository.setRecruitUpdate(params);
                recruitRepository.setRecruitAreaDelete(params);
            }

            if(!area.isEmpty()) {
                params.put("area", area);
                recruitRepository.setRecruitAreaInsert(params);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    public void setRecruitUpdate(Map<String, Object> params){
        recruitRepository.setRecruitUpdate(params);
    }

    @Override
    public void setRecruitDel(Map<String, Object> params) {
        recruitRepository.setRecruitDel(params);
    }

    @Override
    public void setRecruitStatusUpd(Map<String, Object> params) {
        if(params.get("recruitStatusSn").equals("2")){
            /** 홈페이지 채용공고 insert */
            
        }

        recruitRepository.setRecruitStatusUpd(params);
    }

    @Override
    public List<Map<String, Object>> getApplicationList(Map<String, Object> params) {
        List<Map<String, Object>> list = recruitRepository.getApplicationList(params);

//        for(Map<String, Object> map : list){
//
//        }

        return list;
    }

    @Override
    public Map<String, Object> getApplication(Map<String, Object> params) {
        Map<String, Object> searchMap = new HashMap<>();

        /**
         * 기본정보
         */
        Map<String, Object> returnMap = new HashMap<>();
        if(params.containsKey("type")){
            String recruitAreaInfoSn = "";
            for(Map<String, Object> map :  applicationRepository.getApplicationForm1List(params)){
                recruitAreaInfoSn += "," + map.get("RECRUIT_AREA_INFO_SN");
                if(map.get("APPLICATION_ID").toString().equals(params.get("applicationId").toString())){
                    returnMap = map;
                }
            }
            returnMap.put("RECRUIT_AREA_INFO_SN", recruitAreaInfoSn.substring(1));
        } else {
            returnMap = applicationRepository.getApplicationForm1(params);
        }
        searchMap.put("fileNo", returnMap.get("PHOTO_FILE"));
        returnMap.put("photoFile", applicationRepository.getApplicationFileInfo(searchMap));
        searchMap.put("fileNo", returnMap.get("ARMI_FILE"));
        returnMap.put("armiFile", applicationRepository.getApplicationFileInfo(searchMap));
        searchMap.put("fileNo", returnMap.get("PERSON_FILE"));
        returnMap.put("file", applicationRepository.getApplicationFileInfo(searchMap));


        /**
         * 학력/경력
         */
        List<Map<String, Object>> schoolList = applicationRepository.getApplicationSchool(params);
        for(Map<String, Object> map : schoolList){
            searchMap.put("fileNo", map.get("DEGREE_FILE"));
            map.put("degreeFile", commonRepository.getContentFileOne(searchMap));
            searchMap.put("fileNo", map.get("SEXUAL_FILE"));
            map.put("sexualFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("school", schoolList);

        List<Map<String, Object>> careerList = applicationRepository.getApplicationCareer(params);
        for(Map<String, Object> map : careerList){
            searchMap.put("fileNo", map.get("CAREER_FILE"));
            map.put("careerFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("career", careerList);


        /**
         * 자격/면허
         */
        List<Map<String, Object>> certList = applicationRepository.getApplicationCert(params);
        for(Map<String, Object> map : certList){
            searchMap.put("fileNo", map.get("CERT_FILE"));
            map.put("certFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("cert", certList);

        List<Map<String, Object>> langList = applicationRepository.getApplicationLang(params);
        for(Map<String, Object> map : langList){
            searchMap.put("fileNo", map.get("LANG_FILE"));
            map.put("langFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("lang", langList);

        /**
         * 자기소개서
         */
        returnMap.put("introduce", applicationRepository.getApplicationIntroduce(params));

        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getUserDuplicationList(Map<String, Object> params) {
        return recruitRepository.getUserDuplicationList(params);
    }

    @Override
    public void setApplicationUpd(Map<String, Object> params) {
        recruitRepository.setApplicationUpd(params);

        if(params.get("applicationStat").equals("I") || params.get("applicationStat").equals("IF")){
            if(recruitRepository.getInterViewEvalChk(params)){
                Map<String, Object> saveMap = new HashMap<>();
                saveMap.put("recruitInfoSn", params.get("recruitInfoSn"));
                saveMap.put("recruitStatusSn", "5");
                saveMap.put("recruitStatusText", "면접심사완료");
                recruitRepository.setRecruitStatusUpd(saveMap);
            }
        }
    }

    @Override
    public void setInAvoidUpd(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> appArr = gson.fromJson((String) params.get("appArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> map : appArr){
            recruitRepository.setInAvoidUpd(map);
        }

        /** 불참자 평가 데이터 삭제 */
//        recruitRepository.setInAvoidScoreBoardDel(params);

        if(recruitRepository.getInterViewEvalChk(params)){
            Map<String, Object> saveMap = new HashMap<>();
            saveMap.put("recruitInfoSn", params.get("recruitInfoSn"));
            saveMap.put("recruitStatusSn", "5");
            saveMap.put("recruitStatusText", "면접심사완료");
            recruitRepository.setRecruitStatusUpd(saveMap);
        }
    }

    @Override
    public List<Map<String, Object>> getInApplicationList(Map<String, Object> params) {
        return recruitRepository.getInApplicationList(params);
    }

    @Override
    public void setApplicationInTime(Map<String, Object> params) {
        recruitRepository.setApplicationInTimeDel(params);

        Gson gson = new Gson();
        List<Map<String, Object>> inTimeArr = gson.fromJson((String) params.get("inTimeArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        recruitRepository.setApplicationInTime(inTimeArr);
    }

    @Override
    public void setPrePassAppl(Map<String, Object> params) {
        recruitRepository.setPrePassAppl(params);
    }

    public String cellValueToString(XSSFCell cell){
        String txt = "";

        try {
            if(cell.getCellType() == XSSFCell.CELL_TYPE_STRING){
                txt = cell.getStringCellValue();
            }else if(cell.getCellType() == XSSFCell.CELL_TYPE_NUMERIC){
                txt = String.valueOf( Math.round(cell.getNumericCellValue()) );
            }else if(cell.getCellType() == XSSFCell.CELL_TYPE_FORMULA){
                txt = cell.getRawValue();
            }
        } catch (Exception e) {

        }
        return txt;
    }

    private String getBrowser(HttpServletRequest request) {
        String header = request.getHeader("User-Agent");
        if (header.indexOf("MSIE") > -1) { // IE 10 �씠�븯
            return "MSIE";
        } else if (header.indexOf("Trident") > -1) { // IE 11
            return "MSIE";
        } else if (header.indexOf("Chrome") > -1) {
            return "Chrome";
        } else if (header.indexOf("Opera") > -1) {
            return "Opera";
        }
        return "Firefox";
    }

    private String setDisposition(String filename, String browser) throws Exception {
        String dispositionPrefix = "attachment; filename=";
        String encodedFilename = null;

        if (browser.equals("MSIE")) {
            encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
        } else if (browser.equals("Firefox")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "ISO-8859-1") + "\"";
        } else if (browser.equals("Opera")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Chrome")) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < filename.length(); i++) {
                char c = filename.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = sb.toString();
        } else {

        }
        return dispositionPrefix + encodedFilename;
    }

    public static String passwordEncrypt(String userPassword) throws Exception {
        if(userPassword != null && !userPassword.equals("")){
            return EgovFileScrty.encryptPassword(userPassword);
        }else{
            return "";
        }
    }

    public String replacePasswd(String str){
        if(str.indexOf("&nbsp;") != -1) {
            str = str.replaceAll("&nbsp;", " ");}
        if(str.indexOf("&amp;") != -1) {
            str = str.replaceAll("&amp;", "&");}
        if(str.indexOf("&lt;") != -1) {
            str = str.replaceAll("&lt;", "<");}
        if(str.indexOf("&gt;") != -1) {
            str = str.replaceAll("&gt;", ">");}
        if(str.indexOf("&quot;") != -1) {
            str = str.replaceAll("&quot;", "\"");}
        return str;
    }

    @Override
    public List<Map<String, Object>> getRecruitPrint(Map<String, Object> params) {
        List<Map<String, Object>> list = recruitRepository.getRecruitPrint(params);

        return list;
    }

    @Override
    public void setRecruitArticleViewCount(Map<String, Object> params) { recruitRepository.setRecruitArticleViewCount(params); }

    @Override
    public void insRecruitMember(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> array = gson.fromJson((String) params.get("array"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        for(Map<String, Object> map : array){
            evalManageRepository.setEvalSelection(map);
        }
    }

    @Override
    public List<Map<String, Object>> getCommissionerListCustom(Map<String, Object> params) {
        return recruitRepository.getCommissionerListCustom(params);
    }

    @Override
    public Map<String, Object> getRecruitPrintTitle(Map<String, Object> params){
        return recruitRepository.getRecruitPrintTitle(params);
    }

    @Override
    public void insRecruitMemberDelete(Map<String, Object> params) {
        recruitRepository.insRecruitMemberDelete(params);
    }

    @Override
    public List<Map<String, Object>> getDraftingList(Map<String, Object> params) {
        return recruitRepository.getDraftingList(params);
    }

    @Override
    public void updateDraftDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("recruitInfoSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts)) { // 상신
            recruitRepository.insDraftInfo(params);
        }

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            recruitRepository.updateDraftApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            recruitRepository.updateDraftApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            recruitRepository.updateDraftFinalApprStat(params);
        }
    }

    @Override
    public List<Map<String, Object>> getApplicationCareer(Map<String, Object> params){
        return applicationRepository.getApplicationCareer(params);
    }

    @Override
    public List<Map<String, Object>> getRecruitHistList(Map<String, Object> params){
        return prjRepository.getRecruitHistList(params);
    }
}
