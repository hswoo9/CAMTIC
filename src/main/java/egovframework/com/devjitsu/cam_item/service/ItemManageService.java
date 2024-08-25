package egovframework.com.devjitsu.cam_item.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ItemManageService {
    List<Map<String, Object>> getItemStandardUnitPriceList(Map<String, Object> params);
    List<Map<String, Object>> getSdunitPriceList(Map<String, Object> params);
    void setSdUnitPriceReg(Map<String, Object> params);
    void setSdUnitPriceDel(Map<String, Object> params);
    List<Map<String, Object>> getObtainOrderList(Map<String, Object> params);
    Map<String, Object> getObtainOrder(Map<String, Object> params);
    void setDeadlineUpd(Map<String, Object> params);
    void setPayDepoSnUpd(Map<String, Object> params);
    void setDepositUpd(Map<String, Object> params);
    void setObtainOrder(Map<String, Object> params);
    boolean getOrderDeliveryAmtChk(Map<String, Object> params);
    void setObtainOrderUpd(Map<String, Object> params);
    void setObtainOrderCancel(Map<String, Object> params);
    void setItemEstPrint(Map<String, Object> params);
    Map<String, Object> getEstPrintSn(Map<String, Object> params);
    List<Map<String, Object>> getShipmentRecordMaster(Map<String, Object> params);
    List<Map<String, Object>> getShipmentRecordList(Map<String, Object> params);
    Map<String, Object> getShipmentInvenChk(Map<String, Object> params);
    List<Map<String, Object>> getFwWhCdDesignList(Map<String, Object> params);
    void getFwWhCdDesign(Map<String, Object> params);
    void setShipmentDeadlineUpd(Map<String, Object> params);
    List<Map<String, Object>> getShipmentTrendList(Map<String, Object> params);
    List<Map<String, Object>> getReturnRecordRegList(Map<String, Object> params);
    void setReturnRecord(Map<String, Object> params);
    List<Map<String, Object>> getBomList(Map<String, Object> params);
    Map<String, Object> getBom(Map<String, Object> params);
    List<Map<String, Object>> getBomOutputHistory(Map<String, Object> params);
    List<Map<String, Object>> getBomDetailList(Map<String, Object> params);
    String getStringBomList(Map<String, Object> params);
    Map<String, Object> getInvenChk(Map<String, Object> params);
    void setBomDel(Map<String, Object> params);
    void setBomCopy(Map<String, Object> params);
    void setBomDetailDel(Map<String, Object> params);
    void setBom(Map<String, Object> params);
    void setOutput(Map<String, Object> params);
    List<Map<String, Object>> getMaterialUnitPriceList(Map<String, Object> params);
    List<Map<String, Object>> getCrmItemUnitPriceList(Map<String, Object> params);
    void setCrmItemUnitPriceReg(Map<String, Object> params);
    void setCrmItemUnitPriceDel(Map<String, Object> params);
    Map<String, Object> getItemUnitPrice(Map<String, Object> params);
    Map<String, Object> getItemCostPrice(Map<String, Object> params);
    void receivingExcelFormDown(HttpServletRequest request, HttpServletResponse response) throws IOException;
    List<Map<String, Object>> receivingExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception;
    void setReceivingReg(Map<String, Object> params);
    void setReceivingRegUpd(Map<String, Object> params);
    void setReceivingCancel(Map<String, Object> params);
    Map<String, Object> getItemWhInfo(Map<String, Object> params);
    List<Map<String, Object>> getItemWhInfoList(Map<String, Object> params);
    void setInspectionUpd(Map<String, Object> params);
    List<Map<String, Object>> getItemInvenList(Map<String, Object> params);
    List<Map<String, Object>> getItemInvenAdminList(Map<String, Object> params);
    List<Map<String, Object>> getItemInvenAdminListByMonth(Map<String, Object> params);
    Map<String, Object> getItemInven(Map<String, Object> params);
    void setInvenTransferReg(Map<String, Object> params);
    List<Map<String, Object>> getInvenTransferHistoryList(Map<String, Object> params);
    void setSafetyInvenUpd(Map<String, Object> params);
    List<Map<String, Object>> getCrmSalesConfirmList(Map<String, Object> params);
    void setCrmSalesConfirm(Map<String, Object> params);
    List<Map<String, Object>> getDepositStatList(Map<String, Object> params);
    List<Map<String, Object>> getItemInvenAdjustList(Map<String, Object> params);
    void setDepositConfirm(Map<String, Object> params);

    void itemRegTemplateDown(HttpServletRequest request, HttpServletResponse response) throws Exception;

    void itemExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception;

    void setItemInvenAdjust(Map<String, Object> params);

    void setDeadLine(Map<String, Object> params);

    void updItemManageRealCnt(Map<String, Object> params);
    void updateDocState(Map<String, Object> bodyMap) throws Exception;

    void setEstimateSendMailInfo(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir);
    List<Map<String, Object>> getEstimateSendFileList(Map<String, Object> params);

    List<Map<String, Object>> getItemApprovalInfo(Map<String, Object> params);
    void setItemApprovalInfo(Map<String, Object> params);
    Map<String, Object> getItemApprovalInfoByPk(Map<String, Object> params);
    void updateItemDocState(Map<String, Object> bodyMap) throws Exception;
}
