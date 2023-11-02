package egovframework.com.devjitsu.cam_crm.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_crm.service.CrmService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class CrmServiceImpl implements CrmService {

    @Autowired
    private CrmRepository crmRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getPopCrmList(Map<String, Object> params) {
        return crmRepository.getPopCrmList(params);
    }

    @Override
    public Map<String, Object> getCrmData(Map<String, Object> params) {
        return crmRepository.getCrmData(params);
    }


    @Override
    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return crmRepository.getCrmInfo(params);
    }

    @Override
    public List<Map<String, Object>> getCrmList(Map<String, Object> params) {
        return crmRepository.getCrmList(params);
    }

    @Override
    public void setCrmDel(Map<String, Object> params) {
        crmRepository.setCrmDel(params);
        crmRepository.setCrmHistDel(params);
    }

    @Override
    public void setCrmInfo(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir) {

        try{

            if(params.containsKey("crmSn")){

                if(params.containsKey("data")){
                    crmRepository.updCrmMainData(params);
                } else {
                    crmRepository.updCrmInfo(params);
                }

                MainLib mainLib = new MainLib();
                Map<String, Object> fileInsMap = new HashMap<>();

                MultipartFile crmFile = request.getFile("crmFile");
                MultipartFile crmLics = request.getFile("crmLics");
                MultipartFile bnCp = request.getFile("bnCp");

                if(crmFile != null){
                    if(!crmFile.isEmpty()){
                        fileInsMap = mainLib.fileUpload(crmFile, filePath(params, serverDir));
                        fileInsMap.put("contentId", "crmInfo_" + params.get("crmSn"));
                        fileInsMap.put("crmSn", params.get("crmSn"));
                        fileInsMap.put("fileCd", params.get("menuCd"));
                        fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                        fileInsMap.put("filePath", filePath(params, baseDir));
                        fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                        fileInsMap.put("empSeq", params.get("regEmpSeq"));
                        commonRepository.insOneFileInfo(fileInsMap);

                        fileInsMap.put("crmFile", fileInsMap.get("file_no"));
                        crmRepository.updCrmFile(fileInsMap);
                    }
                }

                if(crmLics != null){
                    if(!crmLics.isEmpty()){
                        fileInsMap = mainLib.fileUpload(crmLics, filePath(params, serverDir));
                        fileInsMap.put("contentId", "crmInfo_" + params.get("crmSn"));
                        fileInsMap.put("crmSn", params.get("crmSn"));
                        fileInsMap.put("fileCd", params.get("menuCd"));
                        fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                        fileInsMap.put("filePath", filePath(params, baseDir));
                        fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                        fileInsMap.put("empSeq", params.get("regEmpSeq"));
                        commonRepository.insOneFileInfo(fileInsMap);

                        fileInsMap.put("crmLics", fileInsMap.get("file_no"));
                        crmRepository.updCrmLics(fileInsMap);
                    }
                }

                if(bnCp != null){
                    if(!bnCp.isEmpty()){
                        fileInsMap = mainLib.fileUpload(bnCp, filePath(params, serverDir));
                        fileInsMap.put("contentId", "crmInfo_" + params.get("crmSn"));
                        fileInsMap.put("crmSn", params.get("crmSn"));
                        fileInsMap.put("fileCd", params.get("menuCd"));
                        fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                        fileInsMap.put("filePath", filePath(params, baseDir));
                        fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                        fileInsMap.put("empSeq", params.get("regEmpSeq"));
                        commonRepository.insOneFileInfo(fileInsMap);

                        fileInsMap.put("bnCp", fileInsMap.get("file_no"));
                        crmRepository.updBnCp(fileInsMap);
                    }
                }
            } else {
                crmRepository.insCrmInfo(params);
            }


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

    @Override
    public Map<String, Object> getCrmFileInfo(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        result.put("crmFile", crmRepository.getCrmFileInfo(params));
        result.put("crmLics", crmRepository.getCrmLicsInfo(params));
        result.put("bnCp", crmRepository.getBnCpInfo(params));
        return result;
    }

    @Override
    public void setCrmMemInfo(Map<String, Object> params) {
        if(!params.containsKey("crmMemSn")){
            crmRepository.insCrmMemInfo(params);
        } else {
            crmRepository.updCrmMemInfo(params);
        }
    }

    @Override
    public List<Map<String, Object>> getCrmMemList(Map<String, Object> params) {
        return crmRepository.getCrmMemList(params);
    }

    @Override
    public void delCrmMemInfo(Map<String, Object> params) {
        crmRepository.delCrmMemInfo(params);
    }

    @Override
    public Map<String, Object> getCrmMemInfo(Map<String, Object> params) {
        return crmRepository.getCrmMemInfo(params);
    }

    @Override
    public Map<String, Object> getCrmIndustry(Map<String, Object> params) {
        return crmRepository.getCrmIndustry(params);
    }

    @Override
    public void setCrmIndustry(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("crmIndustrySn"))){
            crmRepository.setCrmIndustry(params);
        }else{
            crmRepository.setCrmIndustryUpd(params);
        }
    }

    @Override
    public Map<String, Object> getCrmCert(Map<String, Object> params) {
        return crmRepository.getCrmCert(params);
    }

    @Override
    public void setCrmCert(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("crmCertSn"))){
            crmRepository.setCrmCert(params);
        }else{
            crmRepository.setCrmCertUpd(params);
        }
    }

    @Override
    public Map<String, Object> getCrmAccounting(Map<String, Object> params) {
        return crmRepository.getCrmAccounting(params);
    }

    @Override
    public void setCrmAccounting(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        if(StringUtils.isEmpty(params.get("crmAccountingSn"))){
            crmRepository.setCrmAccounting(params);
        }else{
            crmRepository.setCrmAccountingUpd(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 사업자 등록증 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("crmAccountingSn", params.get("crmAccountingSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE1");
                fileInsMap.put("crmSn", params.get("crmSn"));
                crmRepository.setCrmAccountingFileUpd(fileInsMap);
            }
        }

        /** 통장사본 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("crmAccountingSn", params.get("crmAccountingSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE2");
                fileInsMap.put("crmSn", params.get("crmSn"));

                crmRepository.setCrmAccountingFileUpd(fileInsMap);
            }
        }
    }

    @Override
    public Map<String, Object> getCrmMgScale(Map<String, Object> params) {
        return crmRepository.getCrmMgScale(params);
    }

    @Override
    public void setCrmMgScale(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("crmMgScaleSn"))){
            crmRepository.setCrmMgScale(params);
        }else{
            crmRepository.setCrmMgScaleUpd(params);
        }
    }

    @Override
    public Map<String, Object> getCrmInterests(Map<String, Object> params) {
        return crmRepository.getCrmInterests(params);
    }

    @Override
    public void setCrmInterests(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("crmInterestsSn"))){
            crmRepository.setCrmInterests(params);
        }else{
            crmRepository.setCrmInterestsUpd(params);
        }
    }

    @Override
    public List<Map<String, Object>> getCrmHistList(Map<String, Object> params) {
        return crmRepository.getCrmHistList(params);
    }

    @Override
    public Map<String, Object> getCrmHist(Map<String, Object> params) {
        /**
         * 기본정보
         */
        Map<String, Object> returnMap = crmRepository.getCrmInfo(params);

        /**
         * 분야별 거래내역(연구개발)
         */

        /**
         * 분야별 거래내역(개발사업)
         */

        /**
         * 분야별 거래내역(교육훈련)
         */

        /**
         * 분야별 거래내역(구매)
         */



        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getCrmHistDetailList(Map<String, Object> params) {
        return crmRepository.getCrmHistList(params);
    }

    @Override
    public List<Map<String, Object>> getCrmHistEngnList(Map<String, Object> params) {
        return crmRepository.getCrmHistEngnList(params);
    }

    @Override
    public void setCrmHist(Map<String, Object> params) {
        crmRepository.insCrmHist(params);
    }

    @Override
    public void setMfOverviewDel(Map<String, Object> params) {
        crmRepository.setMfOverviewDel(params);
    }

    @Override
    public void setMfOverviewByCrmInfoUpd(Map<String, Object> params) {
        crmRepository.setMfOverviewByCrmInfoUpd(params);

        params.put("target", "mfOverView");

        List<Map<String, Object>> list = crmRepository.getCrmList(params);
        for(Map<String, Object> map : list){
            if(!StringUtils.isEmpty(map.get("BASE_DATE"))){
                Map<String, Object> saveMap = new HashMap<>();
                saveMap.put("crmMgScaleSn", map.get("CRM_MG_SCALE_SN"));
                saveMap.put("mgScaleYear", map.get("BASE_DATE"));
                saveMap.put("capital", map.get("CAPITAL"));
                saveMap.put("sales", map.get("SALES"));
                saveMap.put("empCnt", map.get("EMP_CNT"));
                saveMap.put("crmSn", map.get("CRM_SN"));
                saveMap.put("regEmpSeq", params.get("empSeq"));

                if(StringUtils.isEmpty(map.get("crmMgScaleSn"))){
                    crmRepository.setCrmMgScale(saveMap);
                }else{
                    crmRepository.setCrmMgScaleUpd(saveMap);
                }
            }
        }
    }

    @Override
    public Map<String, Object> getMfOverviewInfo(Map<String, Object> params) {
        return crmRepository.getMfOverviewInfo(params);
    }

    @Override
    public List<Map<String, Object>> getMfOverviewStatInfo(Map<String, Object> params) {
        List<Map<String, Object>> statList = new ArrayList<>();

        LocalDate now = LocalDate.now();
        int year = now.getYear();
        for(int i = 0; i < 5; i++){
            params.put("year", year-i);
            Map<String, Object> stat = crmRepository.getMfOverviewStatInfo(params);
            if(stat == null){
                stat = new HashMap<>();
                stat.put("year", year-i);
            }

            statList.add(stat);
        }


        return statList;
    }

    @Override
    public List<Map<String, Object>> getMfOverviewAreaStat(Map<String, Object> params) {
        return crmRepository.getMfOverviewAreaStat(params);
    }

    @Override
    public Map<String, Object> getMfOverviewList(Map<String, Object> params) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("list", crmRepository.getMfOverviewList(params));
        returnMap.put("totalCount", crmRepository.getMfOverviewListCnt(params));
        return returnMap;
    }

    @Override
    public void templateExcelFormDown(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String localPath = "/downloadFile/";
        String fileName = "template.xlsx";
        String viewFileNm = "실태조사 양식.xlsx";
        File reFile = new File(request.getSession().getServletContext().getRealPath(localPath + fileName));

        try {
            if (reFile.exists() && reFile.isFile()) {
                FileInputStream file = new FileInputStream(reFile);
                XSSFWorkbook workbook = new XSSFWorkbook(file);
                Cell cell = null;

                Date now = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                String nowString = sdf.format(now);

                XSSFSheet sheet = workbook.getSheetAt(0);
                XSSFRow row = sheet.createRow(0);
                cell = row.createCell(1);cell.setCellValue("기준일자");
                cell = row.createCell(2);cell.setCellValue(nowString);

                String browser = getBrowser(request);
                String disposition = setDisposition(viewFileNm, browser);
                response.setHeader("Content-Disposition", disposition);
                response.setHeader("Content-Transfer-Encoding", "binary");
                response.setContentType("ms-vnd/excel");

                workbook.write(response.getOutputStream());
                workbook.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void mfExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception {
        MultipartFile fileNm = request.getFile("mfFile");

        File dest = new File(fileNm.getOriginalFilename());
        fileNm.transferTo(dest);

        XSSFRow row;
        XSSFCell col1;

        FileInputStream inputStream = new FileInputStream(dest);

        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
        XSSFSheet sheet = workbook.getSheetAt(0);
        int rows = sheet.getPhysicalNumberOfRows();
        String baseDate = cellValueToString(sheet.getRow(0).getCell(2));
        List<Map<String, Object>> dataList = new ArrayList<>();

        Map<String, Object> tumpMap = null;
        for(int i=3; i < rows; i++){
            Map<String, Object> testList = new HashMap<>();
            tumpMap = new HashMap<String, Object>();
            row = sheet.getRow(i);
            col1 = row.getCell(1);

            if(row != null){
                if(cellValueToString(col1).equals("")){
                    return;
                } else {
                    int cells = sheet.getRow(i).getPhysicalNumberOfCells();
                    tumpMap.put("baseDate", baseDate);
                    tumpMap.put("mfArea", cellValueToString(row.getCell(1)));
                    tumpMap.put("active", cellValueToString(row.getCell(2)).equals("정상") ? "Y" : "N");
                    tumpMap.put("mfName", cellValueToString(row.getCell(3)));
                    tumpMap.put("mfNo", cellValueToString(row.getCell(4)));
                    tumpMap.put("ceoName", cellValueToString(row.getCell(5)));
                    tumpMap.put("ceoGender", cellValueToString(row.getCell(6)));
                    tumpMap.put("addr", cellValueToString(row.getCell(7)));
                    tumpMap.put("estDate", cellValueToString(row.getCell(8)));

                    LocalDate now = LocalDate.now();
                    String estYear = row.getCell(8) == null ? String.valueOf(now.getYear()) : cellValueToString(row.getCell(8));

                    if(!estYear.equals("알수없음")){
                        estYear = String.valueOf(now.getYear() - Integer.parseInt(estYear.substring(0, 4)));
                    }

                    tumpMap.put("history", estYear);
                    tumpMap.put("location", cellValueToString(row.getCell(10)));
                    tumpMap.put("industry", cellValueToString(row.getCell(11)));
                    tumpMap.put("industry2", cellValueToString(row.getCell(11)).substring(0, 2));
                    tumpMap.put("mainProduct", cellValueToString(row.getCell(13)));
                    tumpMap.put("amPart", cellValueToString(row.getCell(14)));
                    tumpMap.put("amPartType", cellValueToString(row.getCell(15)));
                    tumpMap.put("telNum", cellValueToString(row.getCell(16)));
                    tumpMap.put("faxNum", cellValueToString(row.getCell(17)));
                    tumpMap.put("homePage", cellValueToString(row.getCell(18)));
                    tumpMap.put("email", cellValueToString(row.getCell(19)));
                    tumpMap.put("capital", cellValueToString(row.getCell(20)));
                    tumpMap.put("sales", cellValueToString(row.getCell(21)));

                    String salesRatioProv = String.valueOf(row.getCell(23));
                    String salesRatioOtProv = String.valueOf(row.getCell(24));

                    if((salesRatioProv.equals("미응답") || salesRatioProv.equals("")) && (salesRatioOtProv.equals("미응답") || salesRatioOtProv.equals(""))){
                        tumpMap.put("salesAmt", "0");
                    }else {
                        if((salesRatioProv.equals("미응답") || salesRatioProv.equals("")) && !salesRatioOtProv.equals("미응답") && !salesRatioOtProv.equals("")){
                            tumpMap.put("salesAmt", Double.parseDouble(salesRatioOtProv));
                        }else if((salesRatioOtProv.equals("미응답") || salesRatioOtProv.equals("")) && !salesRatioProv.equals("미응답") && !salesRatioProv.equals("")){
                            tumpMap.put("salesAmt", Double.parseDouble(salesRatioProv));
                        }else {
                            tumpMap.put("salesAmt", String.valueOf(Double.parseDouble(salesRatioProv) + Double.parseDouble(salesRatioOtProv)));
                        }
                    }

                    tumpMap.put("salesRatioProv", String.valueOf(row.getCell(23)));
                    tumpMap.put("salesRatioOtProv", String.valueOf(row.getCell(24)));
                    tumpMap.put("empCnt", cellValueToString(row.getCell(25)));
                    tumpMap.put("empForeign", cellValueToString(row.getCell(26)));
                    tumpMap.put("foreignCnt", cellValueToString(row.getCell(27)));
                    tumpMap.put("exportYn", cellValueToString(row.getCell(28)));
                    tumpMap.put("laboratoryYn", cellValueToString(row.getCell(29)));
                    tumpMap.put("carbonYn", cellValueToString(row.getCell(30)));
                    tumpMap.put("rprYn", cellValueToString(row.getCell(31)));
                    tumpMap.put("newProductYn", cellValueToString(row.getCell(32)));
                    tumpMap.put("facilityInvestYn", cellValueToString(row.getCell(33)));
                    tumpMap.put("highlySatField", cellValueToString(row.getCell(34)));
                    tumpMap.put("needField", cellValueToString(row.getCell(35)));
                    tumpMap.put("agreeYn", cellValueToString(row.getCell(36)));
                    tumpMap.put("agree2Yn", cellValueToString(row.getCell(37)));
                    tumpMap.put("ceoTelNum", cellValueToString(row.getCell(38)));
                    tumpMap.put("chargeName", cellValueToString(row.getCell(39)));
                    tumpMap.put("chargeTelNum", cellValueToString(row.getCell(40)));
                    tumpMap.put("regEmpSeq", params.get("empSeq"));

                    crmRepository.setMfOverview(tumpMap);

                }
            }
        }
    }

    @Override
    public List<Map<String, Object>> groupCodeList(Map<String, Object> params) {
        return crmRepository.groupCodeList(params);
    }

    @Override
    public void saveGroupCode(Map<String, Object> params) {
        crmRepository.saveGroupCode(params);
    }

    @Override
    public List<Map<String, Object>> codeList(Map<String, Object> params) {
        return crmRepository.codeList(params);
    }

    @Override
    public void insSetLgCode(Map<String, Object> params) {
        crmRepository.insSetLgCode(params);
    }

    @Override
    public List<Map<String, Object>> smCodeList(Map<String, Object> params) {
        return crmRepository.smCodeList(params);
    }

    @Override
    public void insCrmCode(Map<String, Object> params) {
        crmRepository.insCrmCode(params);
    }

    @Override
    public List<Map<String, Object>> selLgCode(Map<String, Object> params) {
        return crmRepository.selLgCode(params);
    }

    @Override
    public List<Map<String, Object>> selSmCode(Map<String, Object> params) {
        return crmRepository.selSmCode(params);
    }

    @Override
    public List<Map<String, Object>> selLgSmCode(Map<String, Object> params) {
        List<Map<String, Object>> lgSmList = crmRepository.selLgCode(params);
        for(Map<String, Object> map : lgSmList){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("grpSn", params.get("grpSn"));
            searchMap.put("lgCd", map.get("LG_CD"));
            map.put("smList", crmRepository.selSmCode(searchMap));
        }

        return lgSmList;
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

    public String cellValueToString(XSSFCell cell){
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
                txt = cell.getCellFormula();
            }
        } catch (Exception e) {

        }
        return txt;
    }
}
