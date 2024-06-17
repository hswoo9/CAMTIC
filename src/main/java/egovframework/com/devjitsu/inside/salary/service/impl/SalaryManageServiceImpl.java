package egovframework.com.devjitsu.inside.salary.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.salary.repository.SalaryManageRepository;
import egovframework.com.devjitsu.inside.salary.service.SalaryManageService;
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

        XSSFRow row; // 로우값
        XSSFCell col1;// 서고
        XSSFCell col2;

        FileInputStream inputStream = new FileInputStream(dest);

        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
        XSSFSheet sheet = workbook.getSheetAt(0); // 첫번째 시트
        int rows = sheet.getPhysicalNumberOfRows();
        row = sheet.getRow(0);

        String errorRow = "";
        FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
        for (int i = 5; i < rows; i++) {
            row = sheet.getRow(i);
            col1 = row.getCell(0);

            if (row != null) {
                if (cellValueToString(col1, workbook).equals("")){

                } else {
                    Map<String, Object> map = new HashMap<>();

                    int cells = sheet.getRow(i).getPhysicalNumberOfCells();
                    map.put("baseYearMonth", params.get("baseYearMonth"));
                    map.put("erpEmpCd", cellValueToString(row.getCell(0), workbook));
                    map.put("empName", cellValueToString(row.getCell(1), workbook).trim());
                    map.put("basicSalary", removeCommas(cellValueToString(row.getCell(2), workbook)));
                    map.put("foodPay", removeCommas(cellValueToString(row.getCell(3), workbook)));
                    map.put("extraPay", removeCommas(cellValueToString(row.getCell(4), workbook)));
                    map.put("bonus", removeCommas(cellValueToString(row.getCell(5), workbook)));
                    map.put("totalPay", Integer.parseInt(map.get("basicSalary").toString()) + Integer.parseInt(map.get("foodPay").toString())
                            + Integer.parseInt(map.get("extraPay").toString()) + Integer.parseInt(map.get("bonus").toString()));

                    map.put("healthIns", removeCommas(cellValueToString(row.getCell(6), workbook)));
                    map.put("careIns", removeCommas(cellValueToString(row.getCell(7), workbook)));
                    map.put("nationalPen", removeCommas(cellValueToString(row.getCell(8), workbook)));
                    map.put("employCompIns", removeCommas(cellValueToString(row.getCell(9), workbook)));
                    map.put("employEmpIns", removeCommas(cellValueToString(row.getCell(10), workbook)));
                    map.put("indIns", removeCommas(cellValueToString(row.getCell(11), workbook)));

                    map.put("loginEmpSeq", params.get("loginEmpSeq"));

                    String empSeq = salaryManageRepository.getEmpSeqByErpCd(map);
                    if(empSeq == null){
                        errorRow +=  ", " + (cellValueToString(row.getCell(1), workbook).trim());
                    }else{
                        map.put("empSeq", empSeq);
                    }
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
}
