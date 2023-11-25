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
import org.springframework.util.StringUtils;
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
    public List<Map<String, Object>> getItemStandardUnitPriceList(Map<String, Object> params) {
        return itemManageRepository.getItemStandardUnitPriceList(params);
    }

    @Override
    public List<Map<String, Object>> getSdunitPriceList(Map<String, Object> params) {
        return itemManageRepository.getSdunitPriceList(params);
    }

    @Override
    public void setSdUnitPriceReg(Map<String, Object> params) {
        Gson gson = new Gson();
        if(!StringUtils.isEmpty(params.get("newData"))){
            params.put("changeNum", itemManageRepository.getMaxChangeNum(params));
            if(!params.get("changeNum").equals("1")){
                Map<String, Object> updateMap = new HashMap<>();
                updateMap.put("endDt", params.get("startDt"));
                updateMap.put("empSeq", params.get("empSeq"));
                updateMap.put("empName", params.get("empName"));
                updateMap.put("masterSn", params.get("masterSn"));
                updateMap.put("changeNum", params.get("changeNum"));
                itemManageRepository.setSdUnitPriceEndDtUpd(updateMap);
            }

            itemManageRepository.setSdUnitPriceReg(params);
        }

        List<Map<String, Object>> oldArr = gson.fromJson((String) params.get("oldArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(oldArr.size() > 0){
            for(Map<String, Object> map : oldArr){
                itemManageRepository.setSdUnitPriceRegUpd(map);
            }
        }
    }

    @Override
    public void setSdUnitPriceDel(Map<String, Object> params) {
        itemManageRepository.setSdUnitPriceDel(params);
    }

    @Override
    public List<Map<String, Object>> getObtainOrderList(Map<String, Object> params) {
        return itemManageRepository.getObtainOrderList(params);
    }

    @Override
    public Map<String, Object> getObtainOrder(Map<String, Object> params) {
        return itemManageRepository.getObtainOrder(params);
    }

    @Override
    public void setDeadlineUpd(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> oorlArr = gson.fromJson((String) params.get("oorlArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(oorlArr.size() > 0){
            for(Map<String, Object> map : oorlArr){
                itemManageRepository.setDeadlineUpd(map);
                itemManageRepository.setShipmentRecord(map);
            }
        }
    }

    @Override
    public void setObtainOrder(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> orArr = gson.fromJson((String) params.get("orArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(orArr.size() > 0){
            for(Map<String, Object> map : orArr){
                itemManageRepository.setObtainOrder(map);
            }
        }
    }

    @Override
    public void setObtainOrderUpd(Map<String, Object> params) {
        itemManageRepository.setObtainOrderUpd(params);
    }

    @Override
    public void setObtainOrderCancel(Map<String, Object> params) {
        itemManageRepository.setObtainOrderCancel(params);
        String[] obtainOrderSnL = params.get("obtainOrderSn").toString().split(",");
        for(String obtainOrderSn : obtainOrderSnL){
            Map<String, Object> map = new HashMap<>();
            map.put("obtainOrderSn", obtainOrderSn);
            map.put("empSeq", params.get("empSeq"));
            itemManageRepository.setDeadlineUpd(map);
        }

    }

    @Override
    public void setItemEstPrint(Map<String, Object> params) {
        itemManageRepository.setItemEstPrint(params);
    }

    @Override
    public Map<String, Object> getEstPrintSn(Map<String, Object> params) {
        Map<String, Object> returnMap = itemManageRepository.getEstPrintSn(params);
        params.put("ooArr", returnMap.get("OBTAIN_ORDER_SN"));
        returnMap.put("obtainOrderList", itemManageRepository.getObtainOrderList(params));

        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getShipmentRecordList(Map<String, Object> params) {
        return itemManageRepository.getShipmentRecordList(params);
    }

    @Override
    public Map<String, Object> getShipmentInvenChk(Map<String, Object> params) {
        Map<String, Object> returnMap = new HashMap<>();
        List<Map<String, Object>> shipmentlist = new ArrayList<>();
        Gson gson = new Gson();
        List<Map<String, Object>> shipmentArr = gson.fromJson((String) params.get("shipmentArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        for(Map<String, Object> map : shipmentArr){
            shipmentlist.addAll(itemManageRepository.getShipmentList(map));
        }

        String message = "";
        for(Map<String, Object> map : shipmentlist){

            int reqQty = Integer.parseInt(map.get("REQ_QTY").toString());
            int invenCnt = Integer.parseInt(map.get("INVEN_CNT").toString());
            int currentInven = Integer.parseInt(map.get("CURRENT_INVEN").toString());
            int safetyInven = Integer.parseInt(map.get("SAFETY_INVEN").toString());

            if(reqQty > 0){
                /** 재고 조회 */
                if(currentInven == 0){
                    returnMap.put("error", "999");
                    message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME")  + " - [재고 부족]\n";
                }else if(reqQty > currentInven){
                    returnMap.put("error", "999");
                    message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME")  + " - [재고 부족]\n";
                }else if((currentInven - reqQty) < safetyInven){
                    returnMap.put("error", "999");
                    message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME")  + " - [안전재고미달 부족]\n";
                }else{
                    returnMap.put("success", "200");
                }

                /** 창고 조회 */
                if(!StringUtils.isEmpty(returnMap.get("success"))) {
                    if (invenCnt == 0) {
                        returnMap.put("error", "999");
                        message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME") + " - [미입고 재고]\n";
                    } else if (invenCnt > 1) {
                        returnMap.put("whCd", "whCd");
                        message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME") + " - [출고창고지정 필요]\n";
                    } else {
                        returnMap.put("success", "200");
                    }
                }
            }else{
                returnMap.put("success", "200");
            }

        }

        returnMap.put("message", message);

        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getFwWhCdDesignList(Map<String, Object> params) {
        Map<String, Object> searchMap = new HashMap<>();
        List<Map<String, Object>> itemMasterList = itemSystemRepository.getItemMasterList(params);
        for(Map<String, Object> map : itemMasterList){
            searchMap.put("masterSn", map.get("MASTER_SN"));
            searchMap.put("reg", "shipmentRecord");
            map.put("whCdList", itemManageRepository.getItemInvenList(searchMap));
        }

        return itemMasterList;
    }

    @Override
    public void getFwWhCdDesign(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> smRecordSnArr = gson.fromJson((String) params.get("smRecordSnArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        List<Map<String, Object>> transferArr = gson.fromJson((String) params.get("transferArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        for(Map<String, Object> map : smRecordSnArr){
            itemManageRepository.setDeliveryAmtUpd(map);
            itemManageRepository.getShipmentDeliveryAmtUpd(map);
        }

        if(transferArr.size() > 0){
            for(Map<String, Object> map : transferArr){
                Map<String, Object> searchMap = new HashMap<>();
                searchMap.put("masterSn", map.get("masterSn"));
                if(!StringUtils.isEmpty(map.get("forwardingWhCd"))){
                    searchMap.put("whCd", map.get("forwardingWhCd"));
                }
                searchMap = itemManageRepository.getItemInvenValidation(searchMap);

                map.put("invenSn", searchMap.get("INVEN_SN"));
                map.put("currentInven", searchMap.get("CURRENT_INVEN"));

                if(StringUtils.isEmpty(map.get("forwardingWhCd"))){
                    map.put("forwardingWhCd", searchMap.get("WH_CD"));
                }
            }

            params.put("newRateArr", transferArr);
            itemManageRepository.setInvenTransferReg(params);
        }
    }

    @Override
    public void setShipmentDeadlineUpd(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> srArr = gson.fromJson((String) params.get("srArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(srArr.size() > 0){
            for(Map<String, Object> map : srArr){
                itemManageRepository.setUnPaidTypeUpd(map);
                itemManageRepository.setShipmentDeadlineUpd(map);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getReturnRecordRegList(Map<String, Object> params) {
        return itemManageRepository.getReturnRecordRegList(params);
    }

    @Override
    public void setReturnRecord(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> rrArr = gson.fromJson((String) params.get("rrArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(rrArr.size() > 0){
            for(Map<String, Object> map : rrArr){
                if(StringUtils.isEmpty(map.get("returnRecordSn"))){
                    itemManageRepository.setReturnRecord(map);
                }else{
                    itemManageRepository.setReturnRecordUpd(map);
                }
            }
        }

        List<Map<String, Object>> transferArr = gson.fromJson((String) params.get("transferArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(transferArr.size() > 0){
            params.put("newRateArr", transferArr);
            itemManageRepository.setInvenTransferReg(params);
        }
    }

    @Override
    public List<Map<String, Object>> getBomList(Map<String, Object> params) {
        return itemManageRepository.getBomList(params);
    }

    @Override
    public void setBomDel(Map<String, Object> params) {
        itemManageRepository.setBomDel(params);
        itemManageRepository.setBomDetailDel(params);
    }

    @Override
    public void setBomCopy(Map<String, Object> params) {
        String[] mainId = params.get("bomSn").toString().split(",");
        for(String id : mainId){
            Map<String, Object> copyMap = new HashMap<>();
            copyMap.put("empSeq", params.get("empSeq"));
            copyMap.put("copyId", id);
            itemManageRepository.setBomCopy(copyMap);
            itemManageRepository.setBomDetailCopy(copyMap);
        }
    }

    @Override
    public void setBomDetailDel(Map<String, Object> params) {
        itemManageRepository.setBomDetailDel(params);
    }

    @Override
    public Map<String, Object> getBom(Map<String, Object> params) {
        return itemManageRepository.getBom(params);
    }

    @Override
    public List<Map<String, Object>> getBomOutputHistory(Map<String, Object> params) {
        return itemManageRepository.getBomOutputHistory(params);
    }

    @Override
    public List<Map<String, Object>> getBomDetailList(Map<String, Object> params) {
        Map<String, Object> searchMap = new HashMap<>();
        List<Map<String, Object>> bomDetailList = itemManageRepository.getBomDetailList(params);
        for(Map<String, Object> map : bomDetailList){
            searchMap.put("masterSn", map.get("MASTER_SN"));
            map.put("whCdList", itemManageRepository.getItemInvenList(searchMap));
        }

        return bomDetailList;
    }

    @Override
    public String getStringBomList(Map<String, Object> params) {
        Map<String, Object> bom = itemManageRepository.getBom(params);

        List<Map<String, Object>> bomDetailList = itemManageRepository.getBomDetailList(params);
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

        bom.put("expanded", true);
        bom.put("base", "Y");

        for (Map<String, Object> map : bomDetailList) {
            map.put("expanded", true);
            map.put("base", "Y");

            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("bomSn", map.get("MASTER_BOM_SN"));
            map.put("items", itemManageRepository.getBomDetailList(searchMap));
        }

        bom.put("items", bomDetailList);

        result.add(bom);

        return new Gson().toJson(result);
    }

    @Override
    public Map<String, Object> getInvenChk(Map<String, Object> params) {
        Map<String, Object> returnMap = new HashMap<>();
        List<Map<String, Object>> bomDetailList = itemManageRepository.getBomDetailList(params);

        String message = "";
        for(Map<String, Object> map : bomDetailList){

            int reqQty = Integer.parseInt(map.get("REQ_QTY").toString());
            int invenCnt = Integer.parseInt(map.get("INVEN_CNT").toString());
            int currentInven = Integer.parseInt(map.get("CURRENT_INVEN").toString());
            int safetyInven = Integer.parseInt(map.get("SAFETY_INVEN").toString());

            /** 창고 조회 */
            if(invenCnt == 0){
                returnMap.put("error", "999");
                message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME")  + " - [미입고 재고]\n";
            }else if(invenCnt > 1) {
                returnMap.put("whCd", "whCd");
                message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME")  + " - [출고창고지정 필요]\n";
            }else {
                returnMap.put("success", "200");
            }

            /** 재고 조회 */
            if(currentInven == 0){
                returnMap.put("error", "999");
                message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME")  + " - [재고 부족]\n";
            }else if(reqQty > currentInven){
                returnMap.put("error", "999");
                message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME")  + " - [재고 부족]\n";
            }else if((currentInven - reqQty) < safetyInven){
                returnMap.put("error", "999");
                message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME")  + " - [안전재고미달 부족]\n";
            }else{
                returnMap.put("success", "200");
            }
        }

        returnMap.put("message", message);
        
        return returnMap;
    }

    @Override
    public void setBom(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("bomSn"))){
            itemManageRepository.setBom(params);
        }else{
            itemManageRepository.setBomUpd(params);
        }

        Gson gson = new Gson();
        List<Map<String, Object>> detailArr = gson.fromJson((String) params.get("detailArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(detailArr.size() > 0){
            for(Map<String, Object> map : detailArr){
                map.put("bomSn", params.get("bomSn"));
                if(StringUtils.isEmpty(map.get("bomDetailSn"))){
                    itemManageRepository.setBomDetail(map);
                }else{
                    itemManageRepository.setBomDetailUpd(map);
                }
            }
        }
    }

    @Override
    public void setOutput(Map<String, Object> params) {
        /** bom 부자재 업데이트 */
        if(!StringUtils.isEmpty(params.get("detailArr"))){
            Gson gson = new Gson();
            List<Map<String, Object>> detailArr = gson.fromJson((String) params.get("detailArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
            for(Map<String, Object> map : detailArr){
                itemManageRepository.setCurrentInvenUpd(map);
            }
        }else{
            List<Map<String, Object>> detailArr = itemManageRepository.getBomDetailList(params);
            for(Map<String, Object> map : detailArr){
                Map<String, Object> updateMap = new HashMap<>();
                updateMap.put("reqQty", map.get("REQ_QTY"));
                updateMap.put("empSeq", params.get("empSeq"));
                updateMap.put("masterSn", map.get("MASTER_SN"));
                updateMap.put("whCd", map.get("WH_CD"));
                itemManageRepository.setCurrentInvenUpd(updateMap);
            }
        }

        /** bom 생산 재고 업데이트 */
        itemManageRepository.setBomCurrentInvenUpd(params);

        /** bom 창고 입고*/
        Map<String, Object> invenSn = itemManageRepository.getItemInvenValidation(params);
        Map<String, Object> saveMap = new HashMap<>();
        saveMap.put("empSeq", params.get("empSeq"));
        saveMap.put("unitPrice", params.get("bomUnitPrice"));
        saveMap.put("whVolume", params.get("outputCnt"));
        saveMap.put("masterSn", params.get("masterSn"));
        if(invenSn != null){
            saveMap.put("invenSn", invenSn.get("INVEN_SN"));
            itemManageRepository.setItemInvenUpd(saveMap);
        }else {
            saveMap.put("whCd", params.get("whCd"));
            itemManageRepository.setItemInven(saveMap);
        }

        itemManageRepository.setItemInvenUnitPriceUpd(saveMap);
    }

    @Override
    public List<Map<String, Object>> getMaterialUnitPriceList(Map<String, Object> params) {
        return itemManageRepository.getMaterialUnitPriceList(params);
    }

    @Override
    public List<Map<String, Object>> getCrmItemUnitPriceList(Map<String, Object> params) {
        return itemManageRepository.getCrmItemUnitPriceList(params);
    }

    @Override
    public void setCrmItemUnitPriceReg(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("crmItemSn"))){
            itemSystemRepository.setCrmItemManage(params);
        }else{
            itemSystemRepository.setCrmItemManageUpd(params);
        }

        Gson gson = new Gson();
        if(!StringUtils.isEmpty(params.get("newData"))){
            params.put("changeNum", itemManageRepository.getCrmItemMaxChangeNum(params));
            if(!params.get("changeNum").equals("1")){
                Map<String, Object> updateMap = new HashMap<>();
                updateMap.put("endDt", params.get("startDt"));
                updateMap.put("empSeq", params.get("empSeq"));
                updateMap.put("empName", params.get("empName"));
                updateMap.put("crmItemSn", params.get("crmItemSn"));
                updateMap.put("changeNum", params.get("changeNum"));
                itemManageRepository.setCrmItemUnitPriceEndDtUpd(updateMap);
            }

            itemManageRepository.setCrmItemUnitPriceReg(params);
        }

        List<Map<String, Object>> oldArr = gson.fromJson((String) params.get("oldArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(oldArr.size() > 0){
            for(Map<String, Object> map : oldArr){
                if(StringUtils.isEmpty(map.get("crmItemSn"))){
                    map.put("crmItemSn", params.get("crmItemSn"));
                }

                itemManageRepository.setCrmItemUnitPriceRegUpd(map);
            }
        }
    }

    @Override
    public void setCrmItemUnitPriceDel(Map<String, Object> params) {
        itemManageRepository.setCrmItemUnitPriceDel(params);
    }

    @Override
    public Map<String, Object> getItemUnitPrice(Map<String, Object> params) {
        Map<String, Object> returnMap = itemManageRepository.getCrmItemUnitPrice(params);
        if(returnMap == null){
            returnMap = itemManageRepository.getItemUnitPrice(params);
        }

        return returnMap;
    }

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
    }

    @Override
    public void setReceivingRegUpd(Map<String, Object> params) {
        itemManageRepository.setReceivingRegUpd(params);
    }

    @Override
    public void setReceivingCancel(Map<String, Object> params) {
        itemManageRepository.setReceivingCancel(params);
    }

    @Override
    public Map<String, Object> getItemWhInfo(Map<String, Object> params) {
        return itemManageRepository.getItemWhInfo(params);
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

    @Override
    public void setSafetyInvenUpd(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> imArr = gson.fromJson((String) params.get("imArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(imArr.size() > 0){
            for(Map<String, Object> map : imArr){
                itemManageRepository.setSafetyInvenUpd(map);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getCrmSalesConfirmList(Map<String, Object> params) {
        return itemManageRepository.getCrmSalesConfirmList(params);
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
