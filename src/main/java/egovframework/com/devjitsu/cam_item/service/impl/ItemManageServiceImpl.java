package egovframework.com.devjitsu.cam_item.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_item.repository.ItemManageRepository;
import egovframework.com.devjitsu.cam_item.repository.ItemSystemRepository;
import egovframework.com.devjitsu.cam_item.service.ItemManageService;
import egovframework.com.devjitsu.cam_item.service.ItemSystemService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@Service
public class ItemManageServiceImpl implements ItemManageService {

    @Autowired
    private ItemManageRepository itemManageRepository;

    @Autowired
    private ItemSystemRepository itemSystemRepository;

    @Autowired
    private CrmRepository crmRepository;

    @Override
    public void receivingExcelFormDown(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String localPath = "/downloadFile/";
        String fileName = "입고등록 양식.xlsx";
        String viewFileNm = "입고등록 양식.xlsx";
        File reFile = new File(request.getSession().getServletContext().getRealPath(localPath + fileName));

        try {
            if (reFile.exists() && reFile.isFile()) {
                Map<String ,Object> searchMap = new HashMap<>();
                List<Map<String, Object>> searchList = new ArrayList<>();

                FileInputStream file = new FileInputStream(reFile);
                XSSFWorkbook workbook = new XSSFWorkbook(file);
                Cell cell = null;
                int rowIndex = 2;

                /** 업체코드 목록 */
                XSSFSheet sheet = workbook.getSheetAt(1);
                searchList = crmRepository.getCrmList(null);

                for(int i = 0; i < searchList.size(); i++){
                    XSSFRow row = sheet.createRow(rowIndex++);

                    cell = row.createCell(0);cell.setCellValue(searchList.get(i).get("CRM_SN").toString());
                    cell = row.createCell(1);cell.setCellValue(searchList.get(i).get("CRM_NM").toString());
                }

                /** 품번 코드 목록 */
                sheet = workbook.getSheetAt(2);
                rowIndex = 2;

                searchMap.put("active", "Y");
                searchList = itemSystemRepository.getItemMasterList(searchMap);
                for(int i = 0; i < searchList.size(); i++){
                    XSSFRow row = sheet.createRow(rowIndex++);
                    cell = row.createCell(0);cell.setCellValue(searchList.get(i).get("ITEM_NO").toString());
                    cell = row.createCell(1);cell.setCellValue(searchList.get(i).get("ITEM_NAME").toString());
                }

                /** 입고형태 코드 목록 */
                sheet = workbook.getSheetAt(3);
                rowIndex = 2;

                searchMap.put("grpSn", "WT");
                searchMap.put("lgCd", "WT");
                searchList = itemSystemRepository.smCodeList(searchMap);

                for(int i = 0; i < searchList.size(); i++){
                    XSSFRow row = sheet.createRow(rowIndex++);

                    cell = row.createCell(0);cell.setCellValue(searchList.get(i).get("ITEM_CD").toString());
                    cell = row.createCell(1);cell.setCellValue(searchList.get(i).get("ITEM_CD_NM").toString());
                }

                /** 입고창고 코드 목록 */
                sheet = workbook.getSheetAt(4);
                rowIndex = 2;

                searchMap.put("grpSn", "WC");
                searchMap.put("lgCd", "WH");
                searchList = itemSystemRepository.smCodeList(searchMap);

                for(int i = 0; i < searchList.size(); i++){
                    XSSFRow row = sheet.createRow(rowIndex++);

                    cell = row.createCell(0);cell.setCellValue(searchList.get(i).get("ITEM_CD").toString());
                    cell = row.createCell(1);cell.setCellValue(searchList.get(i).get("ITEM_CD_NM").toString());
                }

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
    public List<Map<String, Object>> receivingExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception{
        MultipartFile fileNm = request.getFile("file");
        List<Map<String, Object>> returnList = new ArrayList<>();

        File dest = new File(fileNm.getOriginalFilename());
        fileNm.transferTo(dest);

        XSSFRow row;
        FileInputStream inputStream = new FileInputStream(dest);

        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
        XSSFSheet sheet = workbook.getSheetAt(0);
        int rows = sheet.getPhysicalNumberOfRows();

        Map<String, Object> tumpMap = null;
        XSSFCell col0;
        XSSFCell col1;
        XSSFCell col2;
        XSSFCell col3;
        XSSFCell col4;
        XSSFCell col5;
        XSSFCell col7;
        XSSFCell col8;
        XSSFCell col9;

        for(int i = 5; i < rows; i++){
            tumpMap = new HashMap<String, Object>();
            row = sheet.getRow(i);

            /** 필수 cell */
            col0 = row.getCell(0);
            col1 = row.getCell(1);
            col2 = row.getCell(2);
            col3 = row.getCell(3);
            col4 = row.getCell(4);
            col5 = row.getCell(5);
            col7 = row.getCell(7);
            col8 = row.getCell(8);
            col9 = row.getCell(9);

            if(row != null){
                if(!cellValueToString(col0).equals("") && !cellValueToString(col1).equals("") && !cellValueToString(col2).equals("")
                        && !cellValueToString(col3).equals("") && !cellValueToString(col4).equals("") && !cellValueToString(col5).equals("")
                        && !cellValueToString(col7).equals("") && !cellValueToString(col8).equals("") && !cellValueToString(col9).equals("")){
                    params.put("itemNo", cellValueToString(row.getCell(2)));
                    Map<String, Object> masterMap = itemSystemRepository.getItemMaster(params);

                    int cells = sheet.getRow(i).getPhysicalNumberOfCells();

                    tumpMap.put("crmSn", cellValueToString(row.getCell(0)));
                    tumpMap.put("crmNm", cellValueToString(row.getCell(1)));
                    tumpMap.put("masterSn", masterMap.get("MASTER_SN"));
                    tumpMap.put("itemNo", cellValueToString(row.getCell(2)));
                    tumpMap.put("itemName", cellValueToString(row.getCell(3)));
                    tumpMap.put("whType", cellValueToString(row.getCell(4)));
                    tumpMap.put("whVolume", cellValueToString(row.getCell(5)));
                    tumpMap.put("whWeight", cellValueToString(row.getCell(6)));
                    tumpMap.put("unitPrice", cellValueToString(row.getCell(7)));
                    tumpMap.put("amt", cellValueToString(row.getCell(8)));
                    tumpMap.put("whCd", cellValueToString(row.getCell(9)));
                    tumpMap.put("rmk", cellValueToString(row.getCell(10)));
                    tumpMap.put("empSeq", params.get("empSeq"));

                    returnList.add(tumpMap);
                }
            }
        }

        return returnList;
    }

    @Override
    public void setReceivingReg(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> newRateArr = gson.fromJson((String) params.get("newRateArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(newRateArr.size() > 0){
            params.put("newRateArr", newRateArr);
            itemManageRepository.setReceivingReg(params);
        }
        List<Map<String, Object>> oldRateArr = gson.fromJson((String) params.get("oldRateArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(oldRateArr.size() > 0){
            for(Map<String, Object> map : oldRateArr){
                itemManageRepository.setReceivingRegUpd(map);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getItemWhInfoList(Map<String, Object> params) {
        return itemManageRepository.getItemWhInfoList(params);
    }

    @Override
    public void setInspectionUpd(Map<String, Object> params) {
        itemManageRepository.setInspectionUpd(params);
    }

    @Override
    public List<Map<String, Object>> getItemInvenList(Map<String, Object> params) {
        return itemManageRepository.getItemInvenList(params);
    }

    @Override
    public Map<String, Object> getItemInven(Map<String, Object> params) {
        return itemManageRepository.getItemInven(params);
    }

    @Override
    public void setInvenTransferReg(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> newRateArr = gson.fromJson((String) params.get("newRateArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(newRateArr.size() > 0){
            params.put("newRateArr", newRateArr);
            itemManageRepository.setInvenTransferReg(params);
        }
        List<Map<String, Object>> oldRateArr = gson.fromJson((String) params.get("oldRateArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(oldRateArr.size() > 0){
            for(Map<String, Object> map : oldRateArr){
                itemManageRepository.setInvenTransferRegUpd(map);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getInvenTransferHistoryList(Map<String, Object> params) {
        return itemManageRepository.getInvenTransferHistoryList(params);
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
}
