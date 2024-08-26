package egovframework.com.devjitsu.cam_item.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_item.repository.ItemManageRepository;
import egovframework.com.devjitsu.cam_item.repository.ItemSystemRepository;
import egovframework.com.devjitsu.cam_item.service.ItemManageService;
import egovframework.com.devjitsu.cam_item.service.ItemSystemService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
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
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ItemManageServiceImpl implements ItemManageService {

    @Autowired
    private ItemManageRepository itemManageRepository;

    @Autowired
    private ItemSystemRepository itemSystemRepository;

    @Autowired
    private CrmRepository crmRepository;

    @Autowired
    private CommonRepository commonRepository;

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

        if(!StringUtils.isEmpty(params.get("lastUnitPrice"))){
            Map<String, Object> updateMap = new HashMap<>();
            updateMap.put("unitPrice", params.get("lastUnitPrice"));
            updateMap.put("b2bPrice", params.get("lastB2bPrice"));
            updateMap.put("empSeq", params.get("empSeq"));
            updateMap.put("masterSn", params.get("masterSn"));
            itemSystemRepository.setItemMasterUnitPriceUpd(updateMap);
        }
    }

    @Override
    public void setSdUnitPriceDel(Map<String, Object> params) {
        itemManageRepository.setSdUnitPriceDel(params);
    }

    @Override
    public List<Map<String, Object>> getObtainOrderMaster(Map<String, Object> params) {
        return itemManageRepository.getObtainOrderMaster(params);
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
    public void setPayDepoSnUpd(Map<String, Object> params) {
        itemManageRepository.setPayDepoSnUpd(params);
    }

    @Override
    public void setDepositUpd(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> oorlArr = gson.fromJson((String) params.get("oorlArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(oorlArr.size() > 0){
            for(Map<String, Object> map : oorlArr){
                itemManageRepository.setDepositUpd(map);
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
    public boolean getOrderDeliveryAmtChk(Map<String, Object> params) {
        return itemManageRepository.getOrderDeliveryAmtChk(params);
    }

    @Override
    public void setObtainOrderUpd(Map<String, Object> params) {
        itemManageRepository.setObtainOrderUpd(params);
        itemManageRepository.setShipmentDeliveryAmtUpd(params);
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
    public List<Map<String, Object>> getShipmentRecordMaster(Map<String, Object> params) {
        return itemManageRepository.getShipmentRecordMaster(params);
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
//            int invenCnt = Integer.parseInt(map.get("INVEN_CNT").toString());
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
//                if(!StringUtils.isEmpty(returnMap.get("success"))) {
//                    if (invenCnt == 0) {
//                        returnMap.put("error", "999");
//                        message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME") + " - [미입고 재고]\n";
//                    } else if (invenCnt > 1) {
//                        returnMap.put("whCd", "whCd");
//                        message += map.get("ITEM_NO") + " " + map.get("ITEM_NAME") + " - [출고창고지정 필요]\n";
//                    } else {
//                        returnMap.put("success", "200");
//                    }
//                }
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

            if(Integer.parseInt(map.get("deliveryAmt").toString()) > 0){
                itemManageRepository.setItemSmRecordHist(map);
            }
        }

        if(transferArr.size() > 0){
            for(Map<String, Object> map : transferArr){
                Map<String, Object> searchMap = new HashMap<>();
                searchMap.put("masterSn", map.get("masterSn"));
                if(!StringUtils.isEmpty(map.get("forwardingWhCd"))){
                    searchMap.put("whCd", map.get("forwardingWhCd"));
                }
                searchMap = itemManageRepository.getItemInvenValidation(searchMap);

//                map.put("invenSn", searchMap.get("INVEN_SN"));
//                map.put("currentInven", searchMap.get("CURRENT_INVEN"));

//                if(StringUtils.isEmpty(map.get("forwardingWhCd"))){
//                    map.put("forwardingWhCd", searchMap.get("WH_CD"));
//                }
            }
            params.put("newRateArr", transferArr);

            for(Map<String, Object> transMap : transferArr){
                itemManageRepository.setInvenTransferReg(transMap);

                itemManageRepository.insItemHistOutData(transMap);

            }
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
    public List<Map<String, Object>> getShipmentTrendList(Map<String, Object> params) {
        return itemManageRepository.getShipmentTrendList(params);
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
    public Map<String, Object> getItemCostPrice(Map<String, Object> params) {
        return itemManageRepository.getItemCostPrice(params);
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
//        Map<String, Object> map = itemManageRepository.getItemWhInfo(params);
//        params.put("befMasterSn", map.get("MASTER_SN"));
        itemManageRepository.setReceivingRegUpd(params);
        itemManageRepository.updItemHistInfo(params);


//        map.put("AF_MASTER_SN", params.get("masterSn"));
//        if("".equals(params.get("ITEM_NO")) || map.get("ITEM_NO") == null){
//            itemManageRepository.delItemWhInfo(map);
//        }
//
//        itemManageRepository.updItemMasterInfo(params);
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

        String whSn[] = params.get("whSn").toString().split(",");
        for(String map : whSn){
            params.put("itemWhSn", map);
            Map<String, Object> tempMap = itemManageRepository.getItemWhInfo(params);
            itemManageRepository.setItemHistInfo(tempMap);
        }
    }

    @Override
    public List<Map<String, Object>> getItemInvenList(Map<String, Object> params) {
        return itemManageRepository.getItemInvenList(params);
    }
    @Override
    public List<Map<String, Object>> getItemInvenAdminList(Map<String, Object> params) {
        return itemManageRepository.getItemInvenAdminList(params);
    }

    @Override
    public List<Map<String, Object>> getItemInvenAdminListByMonth(Map<String, Object> params) {
        return itemManageRepository.getItemInvenAdminListByMonth(params);
    }

    @Override
    public List<Map<String, Object>> getItemInvenAdjustList(Map<String, Object> params) {
        return itemManageRepository.getItemInvenAdjustList(params);
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

    @Override
    public void setCrmSalesConfirm(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> cscArr = gson.fromJson((String) params.get("cscArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        /*if(cscArr.size() > 0){
            for(Map<String, Object> map : cscArr){
                if(StringUtils.isEmpty(map.get("crmSalesConfirmSn"))){
                    *//*itemManageRepository.setCrmSalesConfirm(map);*//*
                }else{
                    *//*itemManageRepository.setCrmSalesConfirmUpd(map);*//*
                }
            }
        }*/

        if(cscArr.size() > 0){
            for(Map<String, Object> map : cscArr){
                if("confirm".equals(map.get("confirmGubun"))){
                    itemManageRepository.setCrmHistConfirm(map);
                }else{
                    itemManageRepository.setCrmHistConfirmCancle(map);
                }
            }
        }
    }

    @Override
    public List<Map<String, Object>> getDepositStatList(Map<String, Object> params) {
        return itemManageRepository.getDepositStatList(params);
    }

    @Override
    public void setDepositConfirm(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> depositArr = gson.fromJson((String) params.get("depositArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(depositArr.size() > 0){
            for(Map<String, Object> map : depositArr){
                itemManageRepository.setDepositConfirm(map);
            }
        }
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

    @Override
    public void itemRegTemplateDown(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String localPath = "/downloadFile/";
        String fileName = "재고조정 등록 양식.xlsx";
        File reFile = new File(request.getSession().getServletContext().getRealPath(localPath + fileName));

        Workbook workbook = new XSSFWorkbook(reFile);

        List<Map<String, Object>> dataList = itemManageRepository.getExcelItemInfoList();

        addDataToWorkbook(workbook, dataList);

        downloadExcel(response, workbook, "재고조정 등록 양식.xlsx", request);
    }

    private void addDataToWorkbook(Workbook workbook, List<Map<String, Object>> dataList) {
        CellStyle borderedStyle = workbook.createCellStyle();
        borderedStyle.setBorderBottom(BorderStyle.THIN);
        borderedStyle.setBorderTop(BorderStyle.THIN);
        borderedStyle.setBorderRight(BorderStyle.THIN);
        borderedStyle.setBorderLeft(BorderStyle.THIN);

        Sheet sheet = workbook.getSheet("Sheet1");

        int lastRowNum = sheet.getLastRowNum();

        for (int i = 0; i < dataList.size(); i++) {
            Row row = sheet.createRow(lastRowNum + 1 + i);

            Cell cell1 = row.createCell(0); //창고
            cell1.setCellValue(String.valueOf(dataList.get(i).get("WH_CD_NM")));
            cell1.setCellStyle(borderedStyle);

            Cell cell2 = row.createCell(1); //품명
            cell2.setCellValue(String.valueOf(dataList.get(i).get("ITEM_NAME")));
            cell2.setCellStyle(borderedStyle);

            Cell cell3 = row.createCell(2); //현재고
            cell3.setCellValue(String.valueOf(dataList.get(i).get("CURRENT_INVEN")));
            cell3.setCellStyle(borderedStyle);

            Cell cell4 = row.createCell(3); //실사재고수량
            cell4.setCellValue(String.valueOf(dataList.get(i).get("ACTUAL_INVEN")));
            cell4.setCellStyle(borderedStyle);

            Cell cell5 = row.createCell(4); //차이
            cell5.setCellFormula("C" + (lastRowNum + 2 + i) + "-D" + (lastRowNum + 2 + i));
            cell5.setCellStyle(borderedStyle);

            Cell cell6 = row.createCell(5); //재고조정
            if(!"".equals(String.valueOf(dataList.get(i).get("INVEN_AJM")))){
                cell6.setCellFormula("E" + (lastRowNum + 2 + i) + "* -1");
                cell6.setCellStyle(borderedStyle);

            }else{
                cell6.setCellValue(String.valueOf(dataList.get(i).get("INVEN_AJM")));
                cell6.setCellStyle(borderedStyle);

            }

            Cell cell7 = row.createCell(6); //비고
            cell7.setCellValue(String.valueOf(dataList.get(i).get("INVEN_AJM_NOTE")));
            cell7.setCellStyle(borderedStyle);

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
    public void itemExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception {
        MultipartFile fileNm = request.getFile("itemManageFile");
        int empSeq = Integer.parseInt(String.valueOf(params.get("empSeq")));

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

        FileInputStream inputStream = new FileInputStream(dest);

        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
        XSSFSheet sheet = workbook.getSheetAt(0);
        int rows = sheet.getPhysicalNumberOfRows();

        for(int i=5; i < rows; i++){
            Map<String, Object> itemMap = new HashMap<>();

            row = sheet.getRow(i);
            col0 = row.getCell(0); //창고
            col1 = row.getCell(1); //품명
            //col2 = row.getCell(2); //현재고
            col3 = row.getCell(3); //실사재고수량
            col4 = row.getCell(4); //차이
            col5 = row.getCell(5); //재고조정
            col6 = row.getCell(6); //비고

            FormulaEvaluator formulaEval = workbook.getCreationHelper().createFormulaEvaluator();
            if(row != null){
                if(cellValueToString(col0).equals("") || cellValueToString(col1).equals("") ||
                        cellValueToString(col3).equals("") || cellValueToString(col5).equals("") ||
                        cellValueToString(col6).equals("")){
                    return;
                } else {
                    Map<String, Object> dataMap = new HashMap<>();
                    dataMap.put("whCdNm", cellValueToString(col0));
                    dataMap.put("itemName", cellValueToString(col1));

                    int invenSn = Integer.parseInt(String.valueOf(itemManageRepository.getInvenSn(dataMap)));

                    itemMap.put("invenSn", invenSn);
                    itemMap.put("empSeq", empSeq);
                    itemMap.put("actualInven", cellValueToString(col3));

                    String cellValue = "";
                    if( col5 != null ) {
                        CellValue evaluate = formulaEval.evaluate(col5);
                        if (evaluate != null) {
                            cellValue = Integer.toString((int) evaluate.getNumberValue());
                        }

                        itemMap.put("invenAjm", cellValue);
                    }


                    itemMap.put("invenAjmNote", cellValueToString(col6));


                    itemManageRepository.setInvenActual(itemMap);
                }
            }
        }

    }

    @Override
    public void setItemInvenAdjust(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> adjustArr = gson.fromJson((String) params.get("adjustArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(adjustArr.size() > 0){
            for(Map<String, Object> map : adjustArr){
                itemManageRepository.setInvenActual(map);
            }
        }

    }

    @Override
    public void setDeadLine(Map<String, Object> params) {
        itemManageRepository.setDeadLine(params);
        Gson gson = new Gson();
        List<Map<String, Object>> list = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        for(Map<String, Object> map : list){
            int totCnt = Integer.parseInt(map.get("TOT_CNT").toString().split("[.]")[0]);
            int realCnt = Integer.parseInt(map.get("REAL_CNT").toString().split("[.]")[0]);
            int confCnt = 0;
            if(totCnt > realCnt && realCnt > 0){
                params.put("outCnt", totCnt - realCnt);
                params.put("inCnt", 0);
                confCnt = totCnt - realCnt;
            } else if(realCnt > totCnt && realCnt > 0){
                params.put("outCnt", 0);
                params.put("inCnt", realCnt - totCnt);
                confCnt = realCnt - totCnt;
            } else {
                params.put("outCnt", 0);
                params.put("inCnt", 0);
                confCnt = totCnt;
            }

            params.put("confCnt", confCnt);
            params.put("masterSn", map.get("MASTER_SN"));

            itemManageRepository.insHistDeadLineCnt(params);
            itemManageRepository.updItemMasterConfCnt(params);
        }
    }

    @Override
    public void updItemManageRealCnt(Map<String, Object> params) {
        itemManageRepository.updItemManageRealCnt(params);
    }

    @Override
    public void updateDocState(Map<String, Object> bodyMap) throws Exception {
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
        //params.put("hrBizReqId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("100".equals(docSts) || "101".equals(docSts)){
            itemManageRepository.setDeadLine(params);

            List<Map<String, Object>> list = itemManageRepository.getIventDeadLineList(params);

            for(Map<String, Object> map : list){
                int totCnt = Integer.parseInt(map.get("TOT_CNT").toString().split("[.]")[0]);
                int realCnt = Integer.parseInt(map.get("REAL_CNT").toString().split("[.]")[0]);
                int confCnt = 0;
                if(totCnt > realCnt && realCnt > 0){
                    params.put("outCnt", totCnt - realCnt);
                    params.put("inCnt", 0);
                    confCnt = totCnt - realCnt;
                } else if(realCnt > totCnt && realCnt > 0){
                    params.put("outCnt", 0);
                    params.put("inCnt", realCnt - totCnt);
                    confCnt = realCnt - totCnt;
                } else {
                    params.put("outCnt", 0);
                    params.put("inCnt", 0);
                    confCnt = totCnt;
                }

                params.put("confCnt", confCnt);
                params.put("masterSn", map.get("MASTER_SN"));

                itemManageRepository.insHistDeadLineCnt(params);
                itemManageRepository.updItemMasterConfCnt(params);
            }
        }

        /*if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            bustripRepository.updateApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            bustripRepository.updateApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("approveStatCode", 100);
            bustripRepository.updateFinalApprStat(params);

        }*/
    }


    @Override
    public void setEstimateMailCk(Map<String, Object> params) {
        itemManageRepository.setEstimateMailCk(params);
    }
    public void setEstimateSendMailInfo(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {

        itemManageRepository.setEstimateSendMailInfo(params);

        MainLib mainLib = new MainLib();
        if(fileList.length > 0){
            params.put("menuCd", "estimateMail");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("mailSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

            }
            commonRepository.insFileInfo(list);
        }
    }

    public List<Map<String, Object>> getEstimateSendFileList (Map<String, Object> params){
        return itemManageRepository.getEstimateSendFileList(params);
    }

    @Override
    public List<Map<String, Object>> getItemApprovalInfo(Map<String, Object> params) {
        return itemManageRepository.getItemApprovalInfo(params);
    }

    @Override
    public void setItemApprovalInfo(Map<String, Object> params) {
        itemManageRepository.setItemApprovalInfo(params);
    }

    @Override
    public Map<String, Object> getItemApprovalInfoByPk(Map<String, Object> params) {
        return itemManageRepository.getItemApprovalInfoByPk(params);
    }

    @Override
    public void updateItemDocState(Map<String, Object> bodyMap) throws Exception {
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
        params.put("itemApprovalSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            itemManageRepository.updateItemApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            itemManageRepository.updateItemApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("approveStatCode", 100);
            itemManageRepository.updateItemFinalApprStat(params);
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
