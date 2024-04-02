package egovframework.com.devjitsu.cam_purc.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class PurcRepository extends AbstractDAO {


    public List<Map<String, Object>> getPurcReqList(Map<String, Object> params) { return selectList("purc.getPurcReqList", params);}
    public List<Map<String, Object>> getPjtPurcItemList(Map<String, Object> params) { return selectList("purc.getPjtPurcItemList", params);}
    public void setPurcReq(Map<String, Object> params) { insert("purc.setPurcReq", params);}
    public void setPurcReqUpd(Map<String, Object> params) { update("purc.setPurcReqUpd", params);}
    public void setPurcItem(Map<String, Object> params) { insert("purc.setPurcItem", params);}
    public void setPurcItemUpd(Map<String, Object> params) { update("purc.setPurcItemUpd", params);}
    public Map<String, Object> getPurcReq(Map<String, Object> params) { return (Map<String, Object>) selectOne("purc.getPurcReq", params);}
    public List<Map<String, Object>> getPurcItemList(Map<String, Object> params) { return selectList("purc.getPurcItemList", params);}
    public Map<String, Object> getPurcItemAmtTotal(Map<String, Object> params) { return (Map<String, Object>) selectOne("purc.getPurcItemAmtTotal", params);}
    public Map<String, Object> getPurcClaimItemAmtTotal(Map<String, Object> params) { return (Map<String, Object>) selectOne("purc.getPurcClaimItemAmtTotal", params);}
    public Map<String, Object> getPurcReqFileInfo(Map<String, Object> params) { return (Map<String, Object>) selectOne("purc.getPurcReqFileInfo", params);}
    public List<Map<String, Object>> getPurcReqFileList(Map<String, Object> params) { return selectList("purc.getPurcReqFileInfo", params);}
    public void setPurcFileDocNm(Map<String, Object> params) { update("purc.setPurcFileDocNm", params); }
    public void updatePurcApprStat(Map<String, Object> params) { update("purc.updatePurcApprStat", params); }
    public void updatePurcFinalApprStat(Map<String, Object> params) { update("purc.updatePurcFinalApprStat", params); }
    public void updatePurcListFinalApprStat(Map<String, Object> params) { update("purc.updatePurcListFinalApprStat", params); }
    public void updateClaimApprStat(Map<String, Object> params) { update("purc.updateClaimApprStat", params); }
    public void updateClaimFinalApprStat(Map<String, Object> params) { update("purc.updateClaimFinalApprStat", params); }


    public List<Map<String, Object>> getMngReqPurcList(Map<String, Object> params) {
        return selectList("purc.getMngReqPurcList", params);
    }

    public void updPurcItemStat(Map<String, Object> params) {
        update("purc.updPurcItemStat", params);
    }

    public void insPurcClaimItem(Map<String, Object> map) {
        insert("purc.insPurcClaimItem", map);
    }

    public void updPurcClaimItem(Map<String, Object> map) {
        update("purc.updPurcClaimItem", map);
    }

    public Map<String, Object> getPurcClaimData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("purc.getPurcClaimData", params);
    }

    public void insPurcClaimData(Map<String, Object> params) {
        insert("purc.insPurcClaimData", params);
    }

    public void updPurcClaimData(Map<String, Object> params) {
        update("purc.updPurcClaimData", params);
    }

    public List<Map<String, Object>> getPurcClaimItemList(Map<String, Object> params) {
        return selectList("purc.getPurcClaimItemList", params);
    }

    public Map<String, Object> getPurcClaimItemData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("purc.getPurcClaimItemData", params);
    }

    public void delPurcClaimData(Map<String, Object> params) {
        delete("purc.delPurcClaimData", params);
    }

    public void delPurcClaimItem(Map<String, Object> params) {
        delete("purc.delPurcClaimItem", params);
    }

    public void delPurcItem(Map<String, Object> params) {
        delete("purc.delPurcItem", params);
    }

    public List<Map<String, Object>> getPurcClaimList(Map<String, Object> params) {
        return selectList("purc.getPurcClaimList", params);
    }

    public List<Map<String, Object>> getPurcAssetList(Map<String, Object> params) {
        return selectList("purc.getPurcAssetList", params);
    }

    public Map<String, Object> getPurcSum(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("purc.getPurcSum", params);
    }

    public List<Map<String, Object>> getPurcProductList(Map<String, Object> params) {
        return selectList("purc.getPurcProductList", params);
    }

    public void updPurcInspect(Map<String, Object> params) {
        update("purc.updPurcInspect", params);
    }

    public void updPurcInspectStat(Map<String, Object> params) {
        update("purc.updPurcInspectStat", params);
    }

    public void updPurcClaimItemStat(Map<String, Object> params) {
        update("purc.updPurcClaimItemStat", params);
    }

    public void updPurcReqFileCopy(Map<String, Object> params) {
        update("purc.updPurcReqFileCopy", params);
    }

    public void updItemUnAssetStat(Map<String, Object> params) {
        update("purc.updItemUnAssetStat", params);
    }

    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("purc.getCrmInfo", params);
    }

    public void setOrderInfo(Map<String, Object> params) {
        update("purc.setOrderInfo", params);
    }

    public void setOrderYnInfo(Map<String, Object> params) {
        update("purc.setOrderYnInfo", params);
    }

    public List<Map<String, Object>> getProjectPurcList(Map<String, Object> params) {
        return selectList("purc.getProjectPurcList", params);
    }

    public List<Map<String, Object>> getProjectPurcReqList(Map<String, Object> params) {
        return selectList("purc.getProjectPurcReqList", params);
    }

    public Map<String, Object> getPurcClaimDataByPayApp(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("purc.getPurcClaimDataByPayApp", params);
    }

    public List<Map<String, Object>> getClaimFileList(Map<String, Object> map) {
        return selectList("purc.getClaimFileList", map);
    }

    public List<Map<String, Object>> getClaimExnpFileList(Map<String, Object> params) {
        return selectList("purc.getClaimExnpFileList", params);
    }

    public Map<String, Object> getPurcItemMap(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("item.getPurcItemMap", params);
    }

    public void updPurcItemStatusChange(Map<String, Object> params) {
        update("purc.updPurcItemStatusChange", params);
    }

    public Map<String, Object> getClaimData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("purc.getClaimData", params);
    }

    public void delPurcReq(Map<String, Object> params) {
        delete("purc.delPurcReq", params);
    }

    public List<Map<String, Object>> getPurcAndClaimData(Map<String, Object> params) {
        return selectList("purc.getPurcAndClaimData", params);
    }

    public List<Map<String, Object>> getProjectReqFile(Map<String, Object> params) {
        return selectList("purc.getProjectReqFile", params);
    }

    public List<Map<String, Object>> getMngPurcAppList(Map<String, Object> params) {
        return selectList("purc.getMngPurcAppList", params);
    }

    public List<Map<String, Object>> getPurcAddFileList(Map<String, Object> params) {
        return selectList("purc.getPurcAddFileList", params);
    }

    public void delPurcAddFileList(Map<String, Object> params) {
        delete("purc.delPurcAddFileList", params);
    }

    public List<Map<String, Object>> getPurcLinkedAddFile(Map<String, Object> params) {
        return selectList("purc.getPurcLinkedAddFile", params);
    }

    public List<Map<String, Object>> getPurcClaimDocId(Map<String, Object> params) {
        return selectList("purc.getPurcClaimDocId", params);
    }

    public List<Map<String, Object>> getClaimMngList(Map<String, Object> params) {
        return selectList("purc.getClaimMngList", params);
    }

    public void insPayAppPurcReq(Map<String, Object> params) {
        insert("purc.insPayAppPurcReq", params);
    }

    public List<Map<String, Object>> getUserPurcAppList(Map<String, Object> params) {
        return selectList("purc.getUserPurcAppList", params);
    }

    public Map<String, Object> getClaimExnpData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("purc.getClaimExnpData", params);
    }

    public void insPurcBasicSetting(Map<String, Object> params) {
        insert("purc.insPurcBasicSetting", params);
    }

    public void updPurcBasicSetting(Map<String, Object> params) {
        update("purc.updPurcBasicSetting", params);
    }

    public Map<String, Object> getPurcBasicSetting(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("purc.getPurcBasicSetting", params);
    }

    public int getGwIdx(Map<String, Object> params) {
        return (int) selectOne("purc.getGwIdx", params);
    }

    public Map<String, Object> getBasicSetting(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("purc.getBasicSetting", params);
    }

    public List<Map<String, Object>> getInsYList(Map<String, Object> params) {
        return selectList("purc.getInsYList", params);
    }

    public void insItemWhInfo(Map<String, Object> map) {
        insert("purc.insItemWhInfo", map);
    }

    public void insItemMaster(Map<String, Object> map) {
        insert("purc.insItemMaster", map);
    }

    public void insItemMasterHist(Map<String, Object> map) {
        insert("purc.insItemMasterHist", map);
    }

    public void setOrderSendMailInfo(Map<String, Object> params) {
        insert("purc.setOrderSendMailInfo", params);
    }

    public List<Map<String, Object>> getOrderSendFileList(Map<String, Object> params) {
        return selectList("purc.getOrderSendFileList", params);
    }

    public List<Map<String, Object>> getClaimExnpGwCardList(Map<String, Object> map) {
        return selectList("purc.getClaimExnpGwCardList", map);
    }

    public List<Map<String, Object>> getClaimExnpGwEtaxList(Map<String, Object> map) {
        return selectList("purc.getClaimExnpGwEtaxList", map);
    }

    public Map<String, Object> getDetailCardInfo(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("purc.getDetailCardInfo", map);
    }

    public Map<String, Object> getDetailEtaxInfo(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("purc.getDetailEtaxInfo", map);
    }

    public int getMaxCeGwIdx(Map<String, Object> claimData) {
        return (int) selectOne("purc.getMaxCeGwIdx", claimData);
    }

    public List<Map<String, Object>> getClaimListByPurcSn(Map<String, Object> params) {
        return selectList("purc.getClaimListByPurcSn", params);
    }

    public void updClaimPurcOrder(Map<String, Object> purcReqMap) {
        update("purc.updClaimPurcOrder", purcReqMap);
    }
}
