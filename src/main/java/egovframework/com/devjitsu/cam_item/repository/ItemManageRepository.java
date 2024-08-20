package egovframework.com.devjitsu.cam_item.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ItemManageRepository extends AbstractDAO {

    public List<Map<String, Object>> getItemStandardUnitPriceList(Map<String, Object> params) { return selectList("item.getItemStandardUnitPriceList", params);}
    public List<Map<String, Object>> getSdunitPriceList(Map<String, Object> params) { return selectList("item.getSdunitPriceList", params);}
    public String getMaxChangeNum(Map<String, Object> params) { return (String) selectOne("item.getMaxChangeNum", params);}
    public void setSdUnitPriceReg(Map<String, Object> params) { insert("item.setSdUnitPriceReg", params);}
    public void setSdUnitPriceEndDtUpd(Map<String, Object> params) { update("item.setSdUnitPriceEndDtUpd", params);}
    public void setSdUnitPriceRegUpd(Map<String, Object> params) { update("item.setSdUnitPriceRegUpd", params);}
    public void setSdUnitPriceDel(Map<String, Object> params) { delete("item.setSdUnitPriceDel", params);}
    public List<Map<String, Object>> getObtainOrderList(Map<String, Object> params) { return selectList("item.getObtainOrderList", params);}
    public Map<String, Object> getObtainOrder(Map<String, Object> params){ return (Map<String, Object>) selectOne("item.getObtainOrder", params);}
    public void setDeliveryAmtUpd(Map<String, Object> params) { update("item.setDeliveryAmtUpd", params);}
    public void setDeadlineUpd(Map<String, Object> params) { update("item.setDeadlineUpd", params);}
    public void setDepositUpd(Map<String, Object> params) { update("item.setDepositUpd", params);}
    public void setObtainOrder(Map<String, Object> params) { insert("item.setObtainOrder", params);}
    public boolean getOrderDeliveryAmtChk(Map<String, Object> params) { return (Boolean)selectOne("item.getOrderDeliveryAmtChk", params);}
    public void setObtainOrderUpd(Map<String, Object> params) { update("item.setObtainOrderUpd", params);}
    public void setObtainOrderCancel(Map<String, Object> params) { update("item.setObtainOrderCancel", params);}
    public void setItemEstPrint(Map<String, Object> params) { insert("item.setItemEstPrint", params);}
    public Map<String, Object> getEstPrintSn(Map<String, Object> params){ return (Map<String, Object>) selectOne("item.getEstPrintSn", params);}
    public List<Map<String, Object>> getShipmentRecordList(Map<String, Object> params) { return selectList("item.getShipmentRecordList", params);}
    public void getShipmentDeliveryAmtUpd(Map<String, Object> params) { update("item.getShipmentDeliveryAmtUpd", params);}
    public void setItemSmRecordHist(Map<String, Object> params) { insert("item.setItemSmRecordHist", params);}
    public List<Map<String, Object>> getShipmentList(Map<String, Object> params) { return selectList("item.getShipmentList", params);}
    public void setShipmentRecord(Map<String, Object> params) { insert("item.setShipmentRecord", params);}
    public void setUnPaidTypeUpd(Map<String, Object> params) { update("item.setUnPaidTypeUpd", params);}
    public void setShipmentDeadlineUpd(Map<String, Object> params) { update("item.setShipmentDeadlineUpd", params);}
    public void setPayDepoSnUpd(Map<String, Object> params) { update("item.setPayDepoSnUpd", params);}
    public List<Map<String, Object>> getShipmentTrendList(Map<String, Object> params) { return selectList("item.getShipmentTrendList", params);}
    public List<Map<String, Object>> getReturnRecordRegList(Map<String, Object> params) { return selectList("item.getReturnRecordRegList", params);}
    public void setReturnRecord(Map<String, Object> params) { insert("item.setReturnRecord", params);}
    public void setReturnRecordUpd(Map<String, Object> params) { update("item.setReturnRecordUpd", params);}
    public List<Map<String, Object>> getBomList(Map<String, Object> params) { return selectList("item.getBomList", params);}
    public Map<String, Object> getBom(Map<String, Object> params){ return (Map<String, Object>) selectOne("item.getBom", params);}
    public String getBomSn(Map<String, Object> params){ return (String) selectOne("item.getBomSn", params);}
    public List<Map<String, Object>> getBomOutputHistory(Map<String, Object> params) { return selectList("item.getBomOutputHistory", params);}
    public List<Map<String, Object>> getBomDetailList(Map<String, Object> params) { return selectList("item.getBomDetailList", params);}
    public void setBomDel(Map<String, Object> params) { delete("item.setBomDel", params);}
    public void setBomDetailDel(Map<String, Object> params) { delete("item.setBomDetailDel", params);}
    public void setBomCopy(Map<String, Object> params) { delete("item.setBomCopy", params);}
    public void setBomDetailCopy(Map<String, Object> params) { delete("item.setBomDetailCopy", params);}
    public void setBom(Map<String, Object> params) { insert("item.setBom", params);}
    public void setBomUpd(Map<String, Object> params) { update("item.setBomUpd", params);}
    public void setBomDetail(Map<String, Object> params) { insert("item.setBomDetail", params);}
    public void setBomDetailUpd(Map<String, Object> params) { update("item.setBomDetailUpd", params);}
    public void setBomCurrentInvenUpd(Map<String, Object> params) { update("item.setBomCurrentInvenUpd", params);insert("item.setOutputByBom", params);}
    public List<Map<String, Object>> getMaterialUnitPriceList(Map<String, Object> params) { return selectList("item.getMaterialUnitPriceList", params);}
    public List<Map<String, Object>> getCrmItemUnitPriceList(Map<String, Object> params) { return selectList("item.getCrmItemUnitPriceList", params);}
    public String getCrmItemMaxChangeNum(Map<String, Object> params) { return (String) selectOne("item.getCrmItemMaxChangeNum", params);}
    public void setCrmItemUnitPriceReg(Map<String, Object> params) { insert("item.setCrmItemUnitPriceReg", params);}
    public void setCrmItemUnitPriceEndDtUpd(Map<String, Object> params) { update("item.setCrmItemUnitPriceEndDtUpd", params);}
    public void setCrmItemUnitPriceRegUpd(Map<String, Object> params) { update("item.setCrmItemUnitPriceRegUpd", params);}
    public void setCrmItemUnitPriceDel(Map<String, Object> params) { delete("item.setCrmItemUnitPriceDel", params);}
    public Map<String, Object> getCrmItemUnitPrice(Map<String, Object> params) { return (Map<String, Object>) selectOne("item.getCrmItemUnitPrice", params);}
    public Map<String, Object> getItemUnitPrice(Map<String, Object> params) { return (Map<String, Object>) selectOne("item.getItemUnitPrice", params);}
    public Map<String, Object> getItemCostPrice(Map<String, Object> params) { return (Map<String, Object>) selectOne("item.getItemCostPrice", params);}
    public void setCrmItemManageUpd(Map<String, Object> params) { insert("item.setCrmItemManageUpd", params);}
    public List<Map<String, Object>> getItemWhInfoList(Map<String, Object> params) { return selectList("item.getItemWhInfoList", params);}
    public Map<String, Object> getItemWhInfo(Map<String, Object> params) { return (Map<String, Object>) selectOne("item.getItemWhInfo", params);}
    public void setInspectionUpd(Map<String, Object> params) { update("item.setInspectionUpd", params);}
    public void setItemHistInfo(Map<String, Object> params) { update("item.setItemHistInfo", params);}
    public void setReceivingReg(Map<String, Object> params) { insert("item.setReceivingReg", params);}
    public void setReceivingRegUpd(Map<String, Object> params) { update("item.setReceivingRegUpd", params);}
    public void setReceivingCancel(Map<String, Object> params) { update("item.setReceivingCancel", params);}
    public Map<String, Object> getItemInvenValidation(Map<String, Object> params) { return (Map<String, Object>) selectOne("item.getItemInvenValidation", params);}
    public void setItemInven(Map<String, Object> params) { update("item.setItemInven", params);}
    public void setItemInvenUpd(Map<String, Object> params) { update("item.setItemInvenUpd", params);}
    public void setItemInvenUnitPriceUpd(Map<String, Object> params) { update("item.setItemInvenUnitPriceUpd", params);}
    public List<Map<String, Object>> getItemInvenList(Map<String, Object> params) { return selectList("item.getItemInvenList", params);}
    public List<Map<String, Object>> getItemInvenAdminList(Map<String, Object> params) { return selectList("item.getItemInvenAdminList", params);}
    public List<Map<String, Object>> getItemInvenAdminListByMonth(Map<String, Object> params) { return selectList("item.getItemInvenAdminListByMonth", params);}
    public Map<String, Object> getItemInven(Map<String, Object> params){ return (Map<String, Object>) selectOne("item.getItemInven", params);}
    public void setInvenTransferReg(Map<String, Object> params) { insert("item.setInvenTransferReg", params);}
    public void setInvenTransferRegUpd(Map<String, Object> params) { update("item.setInvenTransferRegUpd", params);}
    public List<Map<String, Object>> getInvenTransferHistoryList(Map<String, Object> params) { return selectList("item.getInvenTransferHistoryList", params);}
    public void setCurrentInvenUpd(Map<String, Object> params) { update("item.setCurrentInvenUpd", params);}
    public void setSafetyInvenUpd(Map<String, Object> params) { update("item.setSafetyInvenUpd", params);}
    public List<Map<String, Object>> getCrmSalesConfirmList(Map<String, Object> params) { return selectList("item.getCrmSalesConfirmList", params);}
    public void setCrmSalesConfirm(Map<String, Object> params) { insert("item.setCrmSalesConfirm", params);}
    public void setCrmHistConfirm(Map<String, Object> params) { insert("item.setCrmHistConfirm", params);}
    public void setCrmSalesConfirmUpd(Map<String, Object> params) { update("item.setCrmSalesConfirmUpd", params);}
    public void setCrmHistConfirmCancle(Map<String, Object> params) { update("item.setCrmHistConfirmCancle", params);}
    public List<Map<String, Object>> getDepositStatList(Map<String, Object> params) { return selectList("item.getDepositStatList", params);}
    public void setDepositConfirm(Map<String, Object> params) { update("item.setDepositConfirm", params);}

    public List<Map<String, Object>> getExcelItemInfoList() {
        return selectList("item.getExcelItemInfoList");
    }

    public int getInvenSn(Map<String, Object> dataMap) {
        return (int) selectOne("item.getInvenSn", dataMap);
    }

    public void setInvenActual(Map<String, Object> params) { update("item.setInvenActual", params);}

    public List<Map<String, Object>> getItemInvenAdjustList(Map<String, Object> params) {
        return selectList("item.getItemInvenAdjustList", params);
    }

    public void updItemMasterInfo(Map<String, Object> params) {
        update("item.updItemMasterInfo", params);
    }

    public void delItemWhInfo(Map<String, Object> map) {
        delete("item.delItemWhInfo", map);
    }

    public void updItemHistInfo(Map<String, Object> params) {
        update("item.updItemHistInfo", params);
    }

    public void insItemHistOutData(Map<String, Object> params) {
        insert("item.insItemHistOutData", params);
    }

    public void setDeadLine(Map<String, Object> params) {
        update("item.setDeadLine", params);
    }

    public void updItemManageRealCnt(Map<String, Object> params) {
        update("item.updItemManageRealCnt", params);
    }

    public void insHistDeadLineCnt(Map<String, Object> params) {
        insert("item.insHistDeadLineCnt", params);
    }

    public void updItemMasterConfCnt(Map<String, Object> params) {
        update("item.updItemMasterConfCnt", params);
    }

    public List<Map<String, Object>> getIventDeadLineList(Map<String, Object> params) {
        return selectList("item.getIventDeadLineList", params);
    }

    public void setEstimateSendMailInfo(Map<String, Object> params) {
        insert("item.setEstimateSendMailInfo", params);
    }

    public List<Map<String, Object>> getEstimateSendFileList(Map<String, Object> params) {
        return selectList("item.getEstimateSendFileList", params);
    }

    public List<Map<String, Object>> getItemApprovalInfo(Map<String, Object> params) { return selectList("item.getItemApprovalInfo", params); }

    public void setItemApprovalInfo(Map<String, Object> params) { insert("item.setItemApprovalInfo", params); }

    public Map<String, Object> getItemApprovalInfoByPk(Map<String, Object> params) { return (Map<String, Object>) selectOne("item.getItemApprovalInfoByPk", params);}
    public void updateItemApprStat(Map<String, Object> params) { update("item.updateItemApprStat", params); }
    public void updateItemFinalApprStat(Map<String, Object> params) { update("item.updateItemFinalApprStat", params); }
    public void setShipmentDeliveryAmtUpd(Map<String, Object> params) { update("item.setShipmentDeliveryAmtUpd", params);}
}
