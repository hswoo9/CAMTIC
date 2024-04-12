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
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
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
    public void crmRegTemplateDown(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String localPath = "/downloadFile/";
        String fileName = "고객 등록 양식.xlsx";
        String viewFileNm = "고객 등록 양식.xlsx";
        File reFile = new File(request.getSession().getServletContext().getRealPath(localPath + fileName));

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
    public void crmExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception {
        MultipartFile fileNm = request.getFile("mfFile");

        File dest = new File(fileNm.getOriginalFilename());
        fileNm.transferTo(dest);

        XSSFRow row;
        XSSFCell col0;
        XSSFCell col1;
        XSSFCell col2;
        XSSFCell col3;

        FileInputStream inputStream = new FileInputStream(dest);

        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
        XSSFSheet sheet = workbook.getSheetAt(0);
        int rows = sheet.getPhysicalNumberOfRows();

        for(int i=4; i < rows; i++){
            Map<String, Object> crmInfo = new HashMap<>();
            Map<String, Object> crmMem = new HashMap<>();
            Map<String, Object> crmCert = new HashMap<>();
            Map<String, Object> crmAccounting = new HashMap<>();
            Map<String, Object> crmScale = new HashMap<>();

            row = sheet.getRow(i);
            col0 = row.getCell(0);
            col1 = row.getCell(1);
            col2 = row.getCell(2);
            col3 = row.getCell(3);

            if(row != null){
                if(cellValueToString(col0).equals("") || cellValueToString(col1).equals("") || cellValueToString(col2).equals("") || cellValueToString(col3).equals("")){
                    return;
                } else {

                    crmInfo.put("crmNm", cellValueToString(row.getCell(0)));
                    crmInfo.put("crmNo", cellValueToString(row.getCell(1)));
                    crmInfo.put("crmCeo", cellValueToString(row.getCell(2)));
                    crmInfo.put("email", cellValueToString(row.getCell(3)));
                    crmInfo.put("telNum", cellValueToString(row.getCell(4)));
                    crmInfo.put("phNum", cellValueToString(row.getCell(5)));
                    crmInfo.put("fax", cellValueToString(row.getCell(6)));
                    crmInfo.put("crmEstNo", cellValueToString(row.getCell(7)));
                    crmInfo.put("post", cellValueToString(row.getCell(8)));
                    crmInfo.put("addr", cellValueToString(row.getCell(9)));
                    crmInfo.put("crmOcc", cellValueToString(row.getCell(10)));
                    crmInfo.put("crmEvent", cellValueToString(row.getCell(11)));
                    crmInfo.put("regEmpSeq", params.get("empSeq"));
                    crmRepository.insCrmInfo(crmInfo);

                    crmInfo.put("crmAtt", cellValueToString(row.getCell(12)));
                    crmInfo.put("crmClass", cellValueToString(row.getCell(13)));
                    crmInfo.put("crmSubClass", cellValueToString(row.getCell(14)));
                    crmInfo.put("buyCl", cellValueToString(row.getCell(15)));
                    crmInfo.put("miCl", cellValueToString(row.getCell(16)));
                    crmInfo.put("homepage", cellValueToString(row.getCell(17)));
                    crmInfo.put("crmProd", cellValueToString(row.getCell(18)));
                    crmInfo.put("crmStat", cellValueToString(row.getCell(19)));
                    crmInfo.put("etc", cellValueToString(row.getCell(20)));
                    crmRepository.updCrmInfo(crmInfo);

                    crmMem.put("crmSn", crmInfo.get("crmSn"));
                    crmMem.put("crmMemNm", cellValueToString(row.getCell(21)));
                    crmMem.put("crmMemDuty", cellValueToString(row.getCell(22)));
                    crmMem.put("crmMemDept", cellValueToString(row.getCell(23)));
                    crmMem.put("crmMemPhn", cellValueToString(row.getCell(24)));
                    crmMem.put("crmMemEmail", cellValueToString(row.getCell(25)));
                    crmMem.put("crmMemEtc", cellValueToString(row.getCell(26)));
                    crmMem.put("crmMemClass", cellValueToString(row.getCell(27)));
                    crmMem.put("regEmpSeq", params.get("empSeq"));
                    crmRepository.insCrmMemInfo(crmMem);

                    crmCert.put("crmSn", crmInfo.get("crmSn"));
                    crmCert.put("venture", cellValueToString(row.getCell(28)));
                    crmCert.put("ventureTxt", cellValueToString(row.getCell(29)));
                    crmCert.put("innobiz", cellValueToString(row.getCell(30)));
                    crmCert.put("innobizTxt", cellValueToString(row.getCell(31)));
                    crmCert.put("mainbiz", cellValueToString(row.getCell(32)));
                    crmCert.put("mainbizTxt", cellValueToString(row.getCell(33)));
                    crmCert.put("otherCert", cellValueToString(row.getCell(34)));
                    crmCert.put("regEmpSeq", params.get("empSeq"));
                    crmRepository.setCrmCert(crmCert);

                    crmAccounting.put("crmSn", crmInfo.get("crmSn"));
                    crmAccounting.put("bankName", cellValueToString(row.getCell(35)));
                    crmAccounting.put("accountNum", cellValueToString(row.getCell(36)));
                    crmAccounting.put("accountHolder", cellValueToString(row.getCell(37)));
                    crmAccounting.put("accountChargeNm", cellValueToString(row.getCell(38)));
                    crmAccounting.put("accountChargeEmail", cellValueToString(row.getCell(39)));
                    crmAccounting.put("regEmpSeq", params.get("empSeq"));
                    crmRepository.setCrmAccounting(crmAccounting);

                    crmScale.put("crmSn", crmInfo.get("crmSn"));
                    crmScale.put("mgScaleYear", cellValueToString(row.getCell(40)));
                    crmScale.put("asset", cellValueToString(row.getCell(41)));
                    crmScale.put("liabilities", cellValueToString(row.getCell(42)));
                    crmScale.put("liabilitiesRatio", cellValueToString(row.getCell(43)));
                    crmScale.put("capitalTotal", cellValueToString(row.getCell(44)));
                    crmScale.put("capital", cellValueToString(row.getCell(45)));
                    crmScale.put("capitalRatio", cellValueToString(row.getCell(46)));
                    crmScale.put("sales", cellValueToString(row.getCell(47)));
                    crmScale.put("netIncome", cellValueToString(row.getCell(48)));
                    crmScale.put("operatProfit", cellValueToString(row.getCell(49)));
                    crmScale.put("operatProfitRatio", cellValueToString(row.getCell(50)));
                    crmScale.put("empCnt", cellValueToString(row.getCell(51)));
                    crmScale.put("regEmpSeq", params.get("empSeq"));
                    crmRepository.setCrmMgScale(crmScale);
                }
            }
        }
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
                        fileInsMap.put("filePath", filePath(params, baseDir));
                        fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                        fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
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
                        fileInsMap.put("filePath", filePath(params, baseDir));
                        fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                        fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
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
                        fileInsMap.put("filePath", filePath(params, baseDir));
                        fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                        fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
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

    @Override
    public int crmReqCheck(Map<String, Object> params){
        return crmRepository.crmReqCheck(params);
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
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
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
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
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

        Map<String, Object> cuid = crmRepository.getCUIDOne(params);
        if(cuid != null){
            params.put("cuid", cuid.get("CUID"));
        }
        List<Map<String, Object>> result = crmRepository.getCrmHistDetailList(params);

        /*if(cuid != null){
            Map<String, Object> map = new HashMap<>();
            map.put("cuid", cuid.get("CUID"));
            List<Map<String, Object>> addList = crmRepository.getCrmOldHistList(map);
            result.addAll(addList);
        }*/

        return result;
    }

    @Override
    public List<Map<String, Object>> getCrmHistEngnList(Map<String, Object> params) {
        List<Map<String, Object>> result = crmRepository.getCrmHistEngnList(params);

        Map<String, Object> cuid = crmRepository.getCUIDOne(params);

        if(cuid != null){
            Map<String, Object> map = new HashMap<>();
            map.put("cuid", cuid.get("CUID"));
            List<Map<String, Object>> addList = crmRepository.getCrmOldHistEngnList(map);
            result.addAll(addList);
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getCrmHistRndList(Map<String, Object> params) {
        List<Map<String, Object>> result = new ArrayList<>();
        /*result = crmRepository.getCrmHistRndList(params);*/

        Map<String, Object> cuid = crmRepository.getCUIDOne(params);

        if(cuid != null){
            Map<String, Object> map = new HashMap<>();
            map.put("cuid", cuid.get("CUID"));
            List<Map<String, Object>> addList = crmRepository.getCrmOldHistRndList(map);
            result.addAll(addList);
        }
        return result;
    }
    @Override
    public List<Map<String, Object>> getCrmHistNonRndList(Map<String, Object> params) {
        List<Map<String, Object>> result = new ArrayList<>();
        /*result = crmRepository.getCrmHistNonRndList(params);*/

        Map<String, Object> cuid = crmRepository.getCUIDOne(params);

        if(cuid != null){
            Map<String, Object> map = new HashMap<>();
            map.put("cuid", cuid.get("CUID"));
            List<Map<String, Object>> addList = crmRepository.getCrmOldHistNonRndList(map);
            result.addAll(addList);
        }
        return result;
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
                saveMap.put("asset", "");
                saveMap.put("liabilities", "");
                saveMap.put("liabilitiesRatio", "");
                saveMap.put("capitalTotal", "");
                if(!StringUtils.isEmpty(map.get("CAPITAL"))){
                    if(map.get("CAPITAL").equals("미응답")){
                        saveMap.put("capital", map.get("CAPITAL"));
                    }else{
                        saveMap.put("capital", (Integer.parseInt(map.get("CAPITAL").toString()) * 1000000));
                    }
                }else{
                    saveMap.put("capital", "");
                }
                saveMap.put("capitalRatio", "");
                if(!StringUtils.isEmpty(map.get("SALES"))){
                    if(map.get("SALES").equals("미응답")){
                        saveMap.put("sales", map.get("SALES"));
                    }else{
                        saveMap.put("sales", (Integer.parseInt(map.get("SALES").toString()) * 1000000));
                    }
                }else{
                    saveMap.put("sales", "");
                }
                saveMap.put("netIncome", "");
                saveMap.put("operatProfit", "");
                saveMap.put("operatProfitRatio", "");
                saveMap.put("empCnt", map.get("EMP_CNT"));
                saveMap.put("crmSn", map.get("CRM_SN"));
                saveMap.put("regEmpSeq", params.get("empSeq"));

                if(StringUtils.isEmpty(saveMap.get("crmMgScaleSn"))){
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
        int year = params.get("searchYear") == null ? now.getYear() : Integer.parseInt(params.get("searchYear").toString());
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

        for(int i=2; i < rows; i++){
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
                    tumpMap.put("mfNo", cellValueToString(row.getCell(4)).replaceAll("-", ""));
                    tumpMap.put("ceoName", cellValueToString(row.getCell(5)));
                    tumpMap.put("ceoGender", cellValueToString(row.getCell(6)));
                    tumpMap.put("addr", cellValueToString(row.getCell(7)));
                    tumpMap.put("estDate", cellValueToString(row.getCell(8)));

                    LocalDate now = LocalDate.now();
                    String estYear = row.getCell(8) == null ? "" : cellValueToString(row.getCell(8));

                    if(!estYear.equals("알수없음") && !estYear.equals("") && !estYear.equals("미응답") && (estYear.length() == 8 || estYear.length() == 10)){
                        estYear = String.valueOf(Integer.parseInt(baseDate.substring(0, 4)) - Integer.parseInt(estYear.substring(0, 4)));
                    }

                    tumpMap.put("history", estYear);
                    tumpMap.put("location", cellValueToString(row.getCell(10)));
                    tumpMap.put("industry", cellValueToString(row.getCell(11)));

                    String industry = row.getCell(11) == null ? "" : cellValueToString(row.getCell(11));
                    if(!industry.equals("") && !industry.equals("미응답")){
                        if(industry.substring(0, 1).matches("[+-]?\\d*(\\.\\d+)?") && industry.substring(1, 2).matches("[+-]?\\d*(\\.\\d+)?")){
                            industry = industry.substring(0, 2);
                        }else{
                            industry = "";
                        }
                    }

                    tumpMap.put("industry2", industry);
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

                    if((salesRatioProv.equals("미응답") || salesRatioProv.equals("미") || salesRatioProv.equals("모름") || salesRatioProv.equals("%") || salesRatioProv.equals("-") || salesRatioProv.equals("")) &&
                            (salesRatioOtProv.equals("미응답") || salesRatioOtProv.equals("미") || salesRatioOtProv.equals("모름") || salesRatioOtProv.equals("%") || salesRatioOtProv.equals("-") || salesRatioOtProv.equals(""))){
                        tumpMap.put("salesAmt", "0");
                    }else {
                        if((salesRatioProv.equals("미응답") || salesRatioProv.equals("미")  || salesRatioProv.equals("모름") || salesRatioProv.equals("%") || salesRatioProv.equals("-") || salesRatioProv.equals("")) &&
                                !salesRatioOtProv.equals("미응답") && !salesRatioOtProv.equals("미") && !salesRatioOtProv.equals("모름") && !salesRatioOtProv.equals("%") && !salesRatioOtProv.equals("-") && !salesRatioOtProv.equals("")){
                            tumpMap.put("salesAmt", Double.parseDouble(salesRatioOtProv));
                        }else if((salesRatioOtProv.equals("미응답") || salesRatioOtProv.equals("미") || salesRatioOtProv.equals("모름") || salesRatioOtProv.equals("%") || salesRatioOtProv.equals("-") || salesRatioOtProv.equals("")) &&
                                !salesRatioProv.equals("미응답") && !salesRatioProv.equals("미") && !salesRatioProv.equals("모름") && !salesRatioProv.equals("%") && !salesRatioProv.equals("-") && !salesRatioProv.equals("")){
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
                    tumpMap.put("carbonDetail", cellValueToString(row.getCell(31)));
                    tumpMap.put("rprYn", cellValueToString(row.getCell(32)));
                    tumpMap.put("newProductYn", cellValueToString(row.getCell(33)));
                    tumpMap.put("facilityInvestYn", cellValueToString(row.getCell(34)));
                    tumpMap.put("highlySatField", cellValueToString(row.getCell(35)));
                    tumpMap.put("needField", cellValueToString(row.getCell(36)));
                    tumpMap.put("agreeYn", cellValueToString(row.getCell(37)));
                    tumpMap.put("agree2Yn", cellValueToString(row.getCell(38)));
                    tumpMap.put("ceoTelNum", cellValueToString(row.getCell(39)));
                    tumpMap.put("chargeName", cellValueToString(row.getCell(40)));
                    tumpMap.put("chargeTelNum", cellValueToString(row.getCell(41)));
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

    @Override
    public void setMouAgrInfo(Map<String, Object> params, MultipartFile[] mouFiles, String serverDir, String baseDir) {

        try{
            if (params.containsKey("MOU_AGR_SN")){
                crmRepository.updMouAgrInfo(params);
            } else {
                crmRepository.setMouAgrInfo(params);
            }

            if(mouFiles.length > 0){
                MainLib mainLib = new MainLib();
                List<Map<String, Object>> list = mainLib.multiFileUpload(mouFiles, filePath(params, serverDir));
                for(int i = 0 ; i < list.size() ; i++){
                    list.get(i).put("frKey", params.get("MOU_AGR_SN"));
                    list.get(i).put("empSeq", params.get("regEmpSeq"));
                    list.get(i).put("fileCd", params.get("menuCd"));
                    list.get(i).put("filePath", filePath(params, baseDir));
                    list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                    list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
                }
                commonRepository.insFileInfo(list);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public List<Map<String, Object>> getMouAgrList(Map<String, Object> params){
        return crmRepository.getMouAgrList(params);
    }

    @Override
    public void setMouAgrSnDel(Map<String, Object> params) {
        crmRepository.setMouAgrSnDel(params);
        crmRepository.setMouCrmSnDel(params);
    }

    @Override
    public List<Map<String, Object>> getMouCrmList(Map<String, Object> params){
        return crmRepository.getMouCrmList(params);
    }

    @Override
    public void setMouAgrCrmInfo(Map<String, Object> params){
        crmRepository.setMouAgrCrmInfo(params);
    }

    @Override
    public void setMouCrmSnDel(Map<String, Object> params){
        crmRepository.setMouCrmSnDel(params);
    }

    @Override
    public Map<String, Object> getMouArgInfo(Map<String, Object> params){
        return crmRepository.getMouArgInfo(params);
    }

    @Override
    public List<Map<String, Object>> getMouAgrFileInfo(Map<String, Object> params){
        return crmRepository.getMouAgrFileInfo(params);
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
