package egovframework.com.devjitsu.inside.salary.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.salary.repository.SalaryManageRepository;
import egovframework.com.devjitsu.inside.salary.service.SalaryManageService;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class SalaryManageServiceImpl implements SalaryManageService {
    private static final Logger logger = (Logger) LoggerFactory.getLogger(SalaryManageServiceImpl.class);

    @Autowired
    private SalaryManageRepository salaryManageRepository;

    @Override
    public List<Map<String, Object>> getEmpSalaryManageList(Map<String, Object> params) {
        return salaryManageRepository.getEmpSalaryManageList(params);
    }

    @Override
    public List<Map<String, Object>> getSocialRateManageList(Map<String, Object> params) {
        return salaryManageRepository.getSocialRateManageList(params);
    }

    @Override
    public void setSocialRate(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> newRateArr = gson.fromJson((String) params.get("newRateArr"), new TypeToken<List<Map<String, Object>>>() {
        }.getType());
        if (newRateArr.size() > 0) {
            params.put("newRateArr", newRateArr);
            salaryManageRepository.setSocialRate(params);
        }
        List<Map<String, Object>> oldRateArr = gson.fromJson((String) params.get("oldRateArr"), new TypeToken<List<Map<String, Object>>>() {
        }.getType());
        if (oldRateArr.size() > 0) {
            for (Map<String, Object> map : oldRateArr) {
                salaryManageRepository.setSocialRateUpd(map);
            }
        }
    }

    @Override
    public void setSocialRateDel(Map<String, Object> params) {
        salaryManageRepository.setSocialRateDel(params);
    }

    @Override
    public List<Map<String, Object>> getEmpSalaryDataList(Map<String, Object> params) {
        return salaryManageRepository.getEmpSalaryDataList(params);
    }

    @Override
    public void setSalaryManage(Map<String, Object> params) {

        String BEF_END_DT = LocalDate.parse(params.get("startDt").toString()).plusDays(-1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        params.put("befEndDt", BEF_END_DT);
        salaryManageRepository.updBefEndDt(params);

        if (!params.containsKey("salarySn")) {
            salaryManageRepository.insSalaryManage(params);
        } else {
            salaryManageRepository.updSalaryManage(params);
        }
    }

    @Override
    public List<Map<String, Object>> getSalaryList(Map<String, Object> params) {

        List<Map<String, Object>> list = new ArrayList<>();
        List<Map<String, Object>> newList = new ArrayList<>();

        list = salaryManageRepository.getSalaryList(params);

        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Map<String, Object> map : list) {
            if (map.get("START_DT") != null && !"".equals(map.get("START_DT"))) {
                String startYm = map.get("START_DT").toString().split("-")[0] + "-" + map.get("START_DT").toString().split("-")[1] + "-" + map.get("START_DT").toString().split("-")[2];

                if(map.get("END_DT") != null && !"".equals(map.get("END_DT"))){
                    String endYm = map.get("END_DT").toString().split("-")[0] + "-" + map.get("END_DT").toString().split("-")[1] + "-" + map.get("END_DT").toString().split("-")[2];

                    for(int i = 1 ; i <= Integer.parseInt(map.get("DIFF_MON").toString()) ; i++){

                        LocalDate s = LocalDate.parse(startYm, df);
                        LocalDate e = LocalDate.parse(endYm, df);
                        Map<String, Object> salMap = new HashMap<>();

                        salMap.put("empSeq", map.get("EMP_SEQ"));
                        salMap.put("empName", map.get("EMP_NAME_KR"));
                        salMap.put("deptName", map.get("DEPT_NAME"));
                        salMap.put("mon", startYm.split("-")[0] + startYm.split("-")[1] + startYm.split("-")[2]);
                        salMap.put("bsSal", map.get("BASIC_SALARY"));
                        salMap.put("extraPay", map.get("EXTRA_PAY"));
                        salMap.put("bonus", map.get("BONUS"));
                        salMap.put("footPay", map.get("FOOD_PAY"));
                        salMap.put("socialRateSn", map.get("SOCIAL_RATE_SN"));
                        newList.add(salMap);

                        if(!s.isEqual(e)){
                            startYm = LocalDate.parse(startYm).plusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                            startYm = startYm.split("-")[0] + "-" + startYm.split("-")[1] + "-01";
                        }else{
                            break;
                        }
                    }

                } else {
                    LocalDate nowDate = LocalDate.now();

                    String endYm = nowDate.format(df);



                    while(true){
                        LocalDate s = LocalDate.parse(startYm, df);
                        LocalDate e = LocalDate.parse(endYm, df);

                        Map<String, Object> salMap = new HashMap<>();

                        salMap.put("empSeq", map.get("EMP_SEQ"));
                        salMap.put("empName", map.get("EMP_NAME_KR"));
                        salMap.put("deptName", map.get("DEPT_NAME"));
                        salMap.put("mon", startYm.split("-")[0] + startYm.split("-")[1] + startYm.split("-")[2]);
                        salMap.put("bsSal", map.get("BASIC_SALARY"));
                        salMap.put("extraPay", map.get("EXTRA_PAY"));
                        salMap.put("bonus", map.get("BONUS"));
                        salMap.put("foodPay", map.get("FOOD_PAY"));
                        salMap.put("socialRateSn", map.get("SOCIAL_RATE_SN"));

                        newList.add(salMap);

                        if(!s.isEqual(e) && s.isBefore(e)){
                            startYm = LocalDate.parse(startYm).plusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                        }else{
                            break;
                        }
                    }
                }
            }
        }

        salaryManageRepository.delSalaryManageList(params);

        salaryManageRepository.insSalaryManageList(newList);

        return newList;
    }

    @Override
    public void delSalaryManage(Map<String, Object> params) {
        salaryManageRepository.delSalaryManage(params);
    }

    @Override
    public void esmRegTemplateDown(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String localPath = "/downloadFile/";
        String fileName = "급여관리 등록 양식.xlsx";
        File reFile = new File(request.getSession().getServletContext().getRealPath(localPath + fileName));

        Workbook workbook = new XSSFWorkbook(reFile);

        List<Map<String, Object>> dataList = salaryManageRepository.getExcelEmpInfoList();

        addDataToWorkbook(workbook, dataList);

        downloadExcel(response, workbook, "급여관리_등록_양식.xlsx", request);
    }

    private void addDataToWorkbook(Workbook workbook, List<Map<String, Object>> dataList) {
        Sheet sheet = workbook.getSheet("Sheet1");

        int lastRowNum = sheet.getLastRowNum();

        for (int i = 0; i < dataList.size(); i++) {
            Row row = sheet.createRow(lastRowNum + 1 + i);

            Cell cell1 = row.createCell(0);
            cell1.setCellValue(String.valueOf(dataList.get(i).get("ERP_EMP_SEQ")));

            Cell cell2 = row.createCell(1);
            cell2.setCellValue(String.valueOf(dataList.get(i).get("EMP_NAME_KR")));
        }
    }

    private void downloadExcel(HttpServletResponse response, Workbook workbook, String fileName, HttpServletRequest request) throws Exception {
        try (FileOutputStream out = new FileOutputStream(fileName)) {
            workbook.write(out);
        }

        File file = new File(fileName);

        response.setContentType("application/octet-stream; charset=utf-8");
        response.setContentLength((int) file.length());
        String browser = getBrowser(request);
        String disposition = setDisposition(fileName, browser);
        response.setHeader("Content-Disposition", disposition);
        response.setHeader("Content-Transfer-Encoding", "binary");

        try (OutputStream out = response.getOutputStream();
             FileInputStream fis = new FileInputStream(file)) {
            FileCopyUtils.copy(fis, out);
        }

        file.delete();
    }
    @Override
    public void esmExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception {
        MultipartFile fileNm = request.getFile("salaryManageFile");

        File dest = new File(fileNm.getOriginalFilename());
        fileNm.transferTo(dest);

        XSSFRow row;
        XSSFCell col0;
        XSSFCell col1;
        XSSFCell col2;
        XSSFCell col3;
        XSSFCell col4;
        XSSFCell col5;
        XSSFCell col6;
        XSSFCell col7;

        FileInputStream inputStream = new FileInputStream(dest);

        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
        XSSFSheet sheet = workbook.getSheetAt(0);
        int rows = sheet.getPhysicalNumberOfRows();

        for(int i=5; i < rows; i++){
            Map<String, Object> salaryMap = new HashMap<>();

            row = sheet.getRow(i);
            col0 = row.getCell(0);
            col1 = row.getCell(1);
            col2 = row.getCell(2);
            col3 = row.getCell(3);
            col4 = row.getCell(4);
            col5 = row.getCell(5);
            col6 = row.getCell(6);
            col7 = row.getCell(7);

            if(row != null){
                if(cellValueToString(col0, workbook).equals("") ||
                        cellValueToString(col1, workbook).equals("") ||
                        cellValueToString(col2, workbook).equals("") ||
                        cellValueToString(col4, workbook).equals("")){
                    return;
                } else {
                    Map<String, Object> dataMap = new HashMap<>();
                    dataMap.put("startDt", cellValueToString(col2, workbook));
                    
                    if(col3 == null || "".equals(String.valueOf(col3))){
                        dataMap.put("endDt", "9999-12-31");
                    }else{
                        dataMap.put("endDt", cellValueToString(col3, workbook));
                    }

                    int socialRateSn = Integer.parseInt(String.valueOf(salaryManageRepository.getsocialRateSn(dataMap)));

                    dataMap.put("erpEmpSeq", cellValueToString(col0, workbook));

                    int empSeq = Integer.parseInt(String.valueOf(salaryManageRepository.getExcelEmpSeq(dataMap)));

                    salaryMap.put("socialRateSn", socialRateSn);
                    salaryMap.put("empSeq", empSeq);
                    salaryMap.put("empName", cellValueToString(col1, workbook));
                    salaryMap.put("startDt", cellValueToString(col2, workbook));
                    salaryMap.put("endDt", cellValueToString(col3, workbook));
                    salaryMap.put("basicSalary", cellValueToString(col4, workbook));
                    salaryMap.put("foodPay", cellValueToString(col5, workbook));
                    salaryMap.put("extraPay", cellValueToString(col6, workbook));
                    salaryMap.put("bonus", cellValueToString(col7, workbook));
                    salaryMap.put("loginEmpSeq", params.get("empSeq"));

                    String BEF_END_DT = LocalDate.parse(salaryMap.get("startDt").toString()).plusDays(-1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                    salaryMap.put("befEndDt", BEF_END_DT);
                    salaryManageRepository.updBefEndDt(salaryMap);

                    salaryManageRepository.insSalaryManage(salaryMap);
                }
            }
        }
    }

    @Override
    public List<Map<String, Object>> getPayRollLedgerList(Map<String, Object> params) {
        return salaryManageRepository.getPayRollLedgerList(params);
    }

    @Override
    public Map<String, Object> setExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception {
        Map<String, Object> returnMap = new HashMap<>();
        List<Map<String, Object>> dataList = new ArrayList<>();

        MultipartFile fileNm = request.getFile("file");
        File dest = new File(fileNm.getOriginalFilename());
        fileNm.transferTo(dest);

        HSSFRow row; // 로우값
        HSSFCell col1;// 서고
        HSSFCell col2;

        FileInputStream inputStream = new FileInputStream(dest);

        HSSFWorkbook workbook = new HSSFWorkbook(inputStream);
        HSSFSheet sheet = workbook.getSheetAt(0); // 첫번째 시트
        int rows = sheet.getPhysicalNumberOfRows();
        row = sheet.getRow(0);

        String errorRow = "";
        FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
        for (int i = 1; i < rows; i++) {
            row = sheet.getRow(i);
            col1 = row.getCell(0);

            if (row != null) {
                if (hCellValueToString(col1, workbook).equals("")){

                } else {
                    Map<String, Object> map = new HashMap<>();

                    int cells = sheet.getRow(i).getPhysicalNumberOfCells();
                    map.put("baseYearMonth", params.get("baseYearMonth"));

                    map.put("empType", hCellValueToString(row.getCell(0), workbook));                    // 부서
                    map.put("erpEmpCd", hCellValueToString(row.getCell(1), workbook));                   // 사원코드
                    map.put("empName", hCellValueToString(row.getCell(2), workbook).trim());             // 사원명
                    map.put("deptCode", hCellValueToString(row.getCell(3), workbook));                   // 부서코드
                    map.put("basicSalary", hCellValueToString(row.getCell(4), workbook));                // 기본급
                    map.put("foodPay", removeCommas(hCellValueToString(row.getCell(5), workbook)));      // 식대
                    map.put("dutyPay", removeCommas(hCellValueToString(row.getCell(6), workbook)));      // 직책수당
                    map.put("dispPay", removeCommas(hCellValueToString(row.getCell(7), workbook)));      // 파견수당
                    map.put("jobPay", removeCommas(hCellValueToString(row.getCell(8), workbook)));       // 직무수당
                    map.put("mstPay", removeCommas(hCellValueToString(row.getCell(9), workbook)));       // 관리감독
                    map.put("ccrPay", removeCommas(hCellValueToString(row.getCell(10), workbook)));      // 겸직수당
                    map.put("annPay", removeCommas(hCellValueToString(row.getCell(11), workbook)));      // 연차수당
                    map.put("overPay", removeCommas(hCellValueToString(row.getCell(12), workbook)));     // 연장근무수당
                    map.put("rdPay", removeCommas(hCellValueToString(row.getCell(13), workbook)));       // 포상금
                    map.put("vacPay", removeCommas(hCellValueToString(row.getCell(14), workbook)));      // 휴가비
                    map.put("qfPay", removeCommas(hCellValueToString(row.getCell(15), workbook)));       // 자격수당
                    map.put("wfPay", removeCommas(hCellValueToString(row.getCell(16), workbook)));       // 복지수당
                    map.put("itPay", removeCommas(hCellValueToString(row.getCell(17), workbook)));       // 지식재산권포상
                    map.put("resPay", removeCommas(hCellValueToString(row.getCell(18), workbook)));      // 연구수당
                    map.put("perfPay", removeCommas(hCellValueToString(row.getCell(19), workbook)));     // 성과금
                    map.put("cbPay", removeCommas(hCellValueToString(row.getCell(20), workbook)));       // 산전후휴가급여
                    map.put("siPay", removeCommas(hCellValueToString(row.getCell(21), workbook)));       // 사회보험사업자부담금
                    map.put("totalPay", removeCommas(hCellValueToString(row.getCell(22), workbook)));    // 지급합계
                    map.put("salTotPay", removeCommas(hCellValueToString(row.getCell(23), workbook)));   // 급여합계
                    map.put("natPay", removeCommas(hCellValueToString(row.getCell(24), workbook)));      // 국민연금
                    map.put("hethPay", removeCommas(hCellValueToString(row.getCell(25), workbook)));     // 건강보험
                    map.put("emplPay", removeCommas(hCellValueToString(row.getCell(26), workbook)));     // 고용보험
                    map.put("socPay", removeCommas(hCellValueToString(row.getCell(27), workbook)));      // 사우회비
                    map.put("socTripPay", removeCommas(hCellValueToString(row.getCell(28), workbook)));  // 사우회여행기금
                    map.put("carePay", removeCommas(hCellValueToString(row.getCell(29), workbook)));     // 장기요양보험료
                    map.put("incPay", removeCommas(hCellValueToString(row.getCell(30), workbook)));      // 소득세
                    map.put("locIncPay", removeCommas(hCellValueToString(row.getCell(31), workbook)));   // 지방소득세
                    map.put("endTaxPay", removeCommas(hCellValueToString(row.getCell(32), workbook)));   // 연말정산소득세
                    map.put("endTaxLocPay", removeCommas(hCellValueToString(row.getCell(33), workbook)));// 연말정산 지방소득세
                    map.put("finsPay", removeCommas(hCellValueToString(row.getCell(34), workbook)));     // 4대보험 연말정산
                    map.put("socEngnPay", removeCommas(hCellValueToString(row.getCell(35), workbook)));  // 과학기술인공제
                    map.put("dormPay", removeCommas(hCellValueToString(row.getCell(36), workbook)));     // 기숙사비
                    map.put("insTotPay", removeCommas(hCellValueToString(row.getCell(37), workbook)));   // 공제합계
                    map.put("supPay", removeCommas(hCellValueToString(row.getCell(38), workbook)));      // 차인지급액

                    map.put("regEmpSeq", params.get("loginEmpSeq"));

                    dataList.add(map);
                }
            }
        }

        String errorMsg = "";

        try{
            salaryManageRepository.setPayRollLegerDel(params);
            salaryManageRepository.setPayRollLeger(dataList);
        } catch (Exception e){
            errorMsg = "오류가 발생하였습니다. 관리자에게 문의하세요.";
        }

        returnMap.put("error", errorMsg);

        if(!"".equals(errorRow)){
            returnMap.put("errorRow", errorRow.substring(2));
        } else {
            returnMap.put("errorRow", "");
        }

        return returnMap;
    }

    @Override
    public Map<String, Object> setExcelUpload2(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception {
        Map<String, Object> returnMap = new HashMap<>();
        List<Map<String, Object>> dataList = new ArrayList<>();

        MultipartFile fileNm = request.getFile("file");
        File dest = new File(fileNm.getOriginalFilename());
        fileNm.transferTo(dest);

        HSSFRow row; // 로우값
        HSSFCell col1;// 서고
        HSSFCell col2;

        FileInputStream inputStream = new FileInputStream(dest);

        HSSFWorkbook workbook = new HSSFWorkbook(inputStream);
        HSSFSheet sheet = workbook.getSheetAt(0); // 첫번째 시트
        int rows = sheet.getPhysicalNumberOfRows();
        row = sheet.getRow(0);

        String errorRow = "";
        FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
        for (int i = 1; i < rows; i++) {
            row = sheet.getRow(i);
            col1 = row.getCell(0);

            if (row != null) {
                if (hCellValueToString(col1, workbook).equals("")){

                } else {
                    Map<String, Object> map = new HashMap<>();

                    int cells = sheet.getRow(i).getPhysicalNumberOfCells();
                    map.put("baseYearMonth", params.get("baseYearMonth"));

                    map.put("erpEmpCd", hCellValueToString(row.getCell(0), workbook));                   // 사원코드
                    map.put("empType", hCellValueToString(row.getCell(1), workbook).trim());             // 구분
                    map.put("empName", hCellValueToString(row.getCell(2), workbook));                    // 사원명
                    map.put("cHethPay", removeCommas(hCellValueToString(row.getCell(3), workbook)));     // 건강보험료
                    map.put("cCarePay", removeCommas(hCellValueToString(row.getCell(4), workbook)));     // 장기요양
                    map.put("cNatPay", removeCommas(hCellValueToString(row.getCell(5), workbook)));      // 국민연금
                    map.put("cEmplPay", removeCommas(hCellValueToString(row.getCell(6), workbook)));     // 고용보험(사업자부담분)
                    map.put("eEmplPay", removeCommas(hCellValueToString(row.getCell(7), workbook)));     // 고용보험(근로자)
                    map.put("cIndtPay", removeCommas(hCellValueToString(row.getCell(8), workbook)));     // 산재보험
                    map.put("retirePay", removeCommas(hCellValueToString(row.getCell(9), workbook)));    // 퇴직연금
                    map.put("cTotPay", removeCommas(hCellValueToString(row.getCell(10), workbook)));     // 사대보험 합계(사업자)
                    map.put("eTotPay", removeCommas(hCellValueToString(row.getCell(11), workbook)));     // 사대보험 합계(근로자)
                    map.put("payType", hCellValueToString(row.getCell(12), workbook).trim());            // 구분

                    map.put("regEmpSeq", params.get("loginEmpSeq"));

                    dataList.add(map);
                }
            }
        }

        String errorMsg = "";

        try{
            salaryManageRepository.setPayRollCompDel(params);
            salaryManageRepository.setPayRollComp(dataList);
        } catch (Exception e){
            errorMsg = "오류가 발생하였습니다. 관리자에게 문의하세요.";
        }

        returnMap.put("error", errorMsg);

        if(!"".equals(errorRow)){
            returnMap.put("errorRow", errorRow.substring(2));
        } else {
            returnMap.put("errorRow", "");
        }

        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getPayRollLedgerStatusList(Map<String, Object> params) {
        return salaryManageRepository.getPayRollLedgerStatusList(params);
    }

    public String cellValueToString(XSSFCell cell, XSSFWorkbook workbook){
        String txt = "";

        try {
            if(cell.getCellType() == XSSFCell.CELL_TYPE_STRING){
                txt = cell.getStringCellValue();
            }else if(cell.getCellType() == XSSFCell.CELL_TYPE_NUMERIC){
                if( DateUtil.isCellDateFormatted(cell)) {
                    Date date = cell.getDateCellValue();
                    txt = new SimpleDateFormat("yyyy-MM-dd").format(date);
                }else{
                    txt = String.valueOf( Math.round(cell.getNumericCellValue()) );
                }
            }else if(cell.getCellType() == XSSFCell.CELL_TYPE_FORMULA){
                FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
                DataFormatter dataFormatter = new DataFormatter();
                txt =  dataFormatter.formatCellValue(evaluator.evaluateInCell(cell)); // 수식 결과
            }
        } catch (Exception e) {

        }
        return txt;
    }

    public String hCellValueToString(HSSFCell cell, HSSFWorkbook workbook){
        String txt = "";

        try {
            if(cell.getCellType() == HSSFCell.CELL_TYPE_STRING){
                txt = cell.getStringCellValue();
            }else if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                if( DateUtil.isCellDateFormatted(cell)) {
                    Date date = cell.getDateCellValue();
                    txt = new SimpleDateFormat("yyyy-MM-dd").format(date);
                }else{
                    txt = String.valueOf( Math.round(cell.getNumericCellValue()) );
                }
            }else if(cell.getCellType() == HSSFCell.CELL_TYPE_FORMULA){
                FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
                DataFormatter dataFormatter = new DataFormatter();
                txt =  dataFormatter.formatCellValue(evaluator.evaluateInCell(cell)); // 수식 결과
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

    private static String removeCommas(String value) {
        return value.replace(",", "");
    }

    @Override
    public List<Map<String, Object>> getPayRollCompanyPay(Map<String, Object> params) {
        return salaryManageRepository.getPayRollCompanyPay(params);
    }
}
