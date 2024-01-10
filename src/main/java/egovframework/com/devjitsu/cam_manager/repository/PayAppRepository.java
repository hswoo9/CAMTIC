package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class PayAppRepository extends AbstractDAO {
    public void insPayAppData(Map<String, Object> params) {
        insert("payApp.insPayAppData", params);
    }

    public void updPayAppData(Map<String, Object> params) {
        update("payApp.updPayAppData", params);
    }

    public Map<String, Object> getPayAppReqData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getPayAppReqData", params);
    }

    public void insPayAppDetailData(Map<String, Object> map) {
        insert("payApp.insPayAppDetailData", map);
    }

    public void delPayAppDetailData(Map<String, Object> params) {
        delete("payApp.delPayAppDetailData", params);
    }

    public List<Map<String, Object>> getPayAppDetailData(Map<String, Object> params) {

        if(!params.containsKey("detArr")){
            return selectList("payApp.getPayAppDetailData", params);
        } else {

        }
        List<Map<String, Object>> list = new ArrayList<>();
        String[] exnpDetSnArr = params.get("detArr").toString().split(",");
        for(String exnpDetSn : exnpDetSnArr){
            params.put("exnpDetSn", exnpDetSn);
            Map<String, Object> map = (Map<String, Object>) selectOne("payApp.getExnpDetailInfo", params);

            list.add(map);
        }


        return list;
    }

    public List<Map<String, Object>> getPaymentList(Map<String, Object> params) {
        return selectList("payApp.getPaymentList", params);
    }

    public List<Map<String, Object>> getWaitPaymentList(Map<String, Object> params) {
        return selectList("payApp.getWaitPaymentList", params);
    }

    public void updatePayAppApprStat(Map<String, Object> params) {
        update("payApp.updatePayAppApprStat", params);
    }

    public void updatePayAppFinalApprStat(Map<String, Object> params) {
        update("payApp.updatePayAppFinalApprStat", params);
    }

    public void updPayAppDetStat(Map<String, Object> params) {
        update("payApp.updPayAppDetStat", params);
    }

    public void setPayAppCostApp(Map<String, Object> params) {
        update("payApp.setPayAppCostApp", params);
    }

    public void setPayAppDetCostApp(Map<String, Object> params) {
        update("payApp.setPayAppDetCostApp", params);
    }

    public void insExnpData(Map<String, Object> params) {
        insert("payApp.insExnpData", params);
    }

    public void updExnpData(Map<String, Object> params) {
        update("payApp.updExnpData", params);
    }

    public void delExnpDetailData(Map<String, Object> params) {
        delete("payApp.delExnpDetailData", params);
    }

    public void insExnpDetailData(Map<String, Object> map) {
        insert("payApp.insExnpDetailData", map);
    }

    public Map<String, Object> getExnpData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getExnpData", params);
    }

    public List<Map<String, Object>> getExnpDetailData(Map<String, Object> params) {
        return selectList("payApp.getExnpDetailData", params);
    }

    public List<Map<String, Object>> getExnpList(Map<String, Object> params) {
        return selectList("payApp.getExnpList", params);
    }

    public void insPayIncpData(Map<String, Object> params) {
        insert("payApp.insPayIncpData", params);
    }

    public void updPayIncpData(Map<String, Object> params) {
        update("payApp.updPayIncpData", params);
    }

    public void delPayIncpDetailData(Map<String, Object> params) {
        delete("payApp.delPayIncpDetailData", params);
    }

    public void insPayIncpDetailData(Map<String, Object> map) {
        insert("payApp.insPayIncpDetailData", map);
    }

    public Map<String, Object> getPayIncpReqData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getPayIncpReqData", params);
    }
    public List<Map<String, Object>> getPayIncpDetailData(Map<String, Object> params) {
        return selectList("payApp.getPayIncpDetailData", params);
    }

    public Map<String, Object> getIncpData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getIncpData", params);
    }

    public List<Map<String, Object>> getIncpG20List(Map<String, Object> params) {
        return selectList("payApp.getIncpG20List", params);
    }

    public List<Map<String, Object>> getExnpReList(Map<String, Object> params) {
        return selectList("payApp.getExnpReList", params);
    }

    public List<Map<String, Object>> getIncpList(Map<String, Object> params) {
        return selectList("payApp.getIncpList", params);
    }

    public List<Map<String, Object>> getIncpReList(Map<String, Object> params) {
        return selectList("payApp.getIncpReList", params);
    }

    public void updPayAppDetailStatus(Map<String, Object> params) {
        update("payApp.updPayAppDetailStatus", params);
    }

    public void updateExnpApprStat(Map<String, Object> params) {
        update("payApp.updateExnpApprStat", params);
    }

    public void updateExnpFinalApprStat(Map<String, Object> params) {
        update("payApp.updateExnpFinalApprStat", params);
    }

    public void updateIncpApprStat(Map<String, Object> params) {
        update("payApp.updateIncpApprStat", params);
    }

    public void updateIncpFinalApprStat(Map<String, Object> params) {
        update("payApp.updateIncpFinalApprStat", params);
    }

    public List<Map<String, Object>> getExnpG20List(Map<String, Object> params) {
        return selectList("payApp.getExnpG20List", params);
    }

    public int getCountDoc(Map<String, Object> data) {
        return (int) selectOne("payApp.getCountDoc", data);
    }

    public int getExnpCountDoc(Map<String, Object> data) {
        return (int) selectOne("payApp.getExnpCountDoc", data);
    }

    public int getIncpCountDoc(Map<String, Object> data) {
        return (int) selectOne("payApp.getIncpCountDoc", data);
    }

    public void updExnpStat(Map<String, Object> data) {
        update("payApp.updExnpStat", data);
    }

    public void updIncpStat(Map<String, Object> data) {
        update("payApp.updIncpStat", data);
    }

    public Map<String, Object> getEmpInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getEmpInfo", params);
    }
    public void resolutionExnpStatus(Map<String, Object> params) {
        update("payApp.resolutionExnpStatus", params);
    }
    public void resolutionIncpAppr(Map<String, Object> params) {
        update("payApp.resolutionIncpAppr", params);
    }

    public void updPayAttDetData(Map<String, Object> params) {insert("payApp.updPayAttDetData", params);}
    public void updExnpAttDetData(Map<String, Object> params) {insert("payApp.updExnpAttDetData", params);}
    public Map<String, Object> getPayAttInfo(Map<String, Object> params) {return (Map<String, Object>) selectOne("payApp.getPayAttInfo", params);}
    public List<Map<String, Object>> getPayAttEtcInfo(Map<String, Object> params) { return selectList("payApp.getPayAttEtcInfo", params);}
    public List<Map<String, Object>> getPayAttList(Map<String, Object> params) { return selectList("payApp.getPayAttList", params);}
    public Map<String, Object> getExnpAttInfo(Map<String, Object> params) {return (Map<String, Object>) selectOne("payApp.getPayAttEtcInfo", params);}
    public List<Map<String, Object>> getExnpAttList(Map<String, Object> params) { return selectList("payApp.getPayAttList", params);}
    public List<Map<String, Object>> getExnpAttEtcInfo(Map<String, Object> params) { return selectList("payApp.getExnpAttEtcInfo", params);}

    public Map<String, Object> getPayAppDetailInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getPayAppDetailInfo", params);
    }

    public List<Map<String, Object>> getPartRatePay(Map<String, Object> params) {
        return selectList("payApp.getPartRatePay", params);
    }

    public List<Map<String, Object>> getDepositList(Map<String, Object> params) {
        return selectList("payApp.getDepositList", params);
    }

    public void updPayDepo(Map<String, Object> params) {
        update("payApp.updPayDepo", params);
    }

    public void insPayDepo(Map<String, Object> params) {
        insert("payApp.insPayDepo", params);
    }

    public Map<String, Object> getPayDepoData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getPayDepoData", params);
    }

    public void updPayDepoData(Map<String, Object> params) {
        update("payApp.updPayDepoData", params);
    }

    public void updPurcClaimByPayAppSn(Map<String, Object> params) {
        update("payApp.updPurcClaimByPayAppSn", params);
    }

    public void updPurcBustripByPayAppSn(Map<String, Object> params) {
        update("payApp.updPurcBustripByPayAppSn", params);
    }

    public void updBustripExnpFileCopy(Map<String, Object> params) {
        insert("payApp.updBustripExnpFileCopy", params);
    }

    public void updPurcSnackByPayAppSn(Map<String, Object> params) {
        update("payApp.updPurcSnackByPayAppSn", params);
    }

    public void updApprStatus(Map<String, Object> params) {
        update("payApp.updApprStatus", params);
    }

    public List<Map<String, Object>> getCheckBudget(Map<String, Object> params) {
        return selectList("payApp.getCheckBudget", params);
    }

    public void delPayApp(int params) {
        delete("payApp.delPayApp", params);
    }

    public List<Map<String, Object>> getPayAppFileList(Map<String, Object> params) {
        return selectList("payApp.getPayAppFileList", params);
    }

    public Map<String, Object> getPayAppInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getPayAppInfo", params);
    }

    public void insUseCardInfo(Map<String, Object> payAppInfo) {
        insert("payApp.insUseCardInfo", payAppInfo);
    }

    public void delUseCardInfo(Map<String, Object> payAppInfo) {
        delete("payApp.delUseCardInfo", payAppInfo);
    }

    public List<Map<String, Object>> getPayAppItemList(Map<String, Object> params) {
        return selectList("payApp.getPayAppItemList", params);
    }

    public Map<String, Object> getApprovalExnpFileData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getApprovalExnpFileData", params);
    }

    public List<Map<String, Object>> getApprovalExnpCommonFileData(Map<String, Object> params) {
        return selectList("payApp.getApprovalExnpCommonFileData", params);
    }

    public List<Map<String, Object>> getPjtExnpList(Map<String, Object> params) {
        return selectList("payApp.getPjtExnpList", params);
    }

    public void updPayDepoFile(Map<String, Object> fileInsMap) {
        update("payApp.updPayDepoFile", fileInsMap);
    }

    public void updExnpDe(Map<String, Object> param) {
        update("payApp.updExnpDe", param);
    }

    public void insProjectTaxInfo(Map<String, Object> params) {
        insert("payApp.insProjectTaxInfo", params);
    }

    public void updProjectTaxInfo(Map<String, Object> params) {
        update("payApp.updProjectTaxInfo", params);
    }

    public Map<String, Object> getProjectSettingInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getProjectSettingInfo", params);
    }

    public void insProjectBudgetInfo(Map<String, Object> params) {
        insert("payApp.insProjectBudgetInfo", params);
    }

    public void updProjectBudgetInfo(Map<String, Object> params) {
        update("payApp.updProjectBudgetInfo", params);
    }

    public void payAppRevert(Map<String, Object> params) {

        update("payApp.payAppRevert", params);
    }

    public void insPayAppRevert(Map<String, Object> params) {
        insert("payApp.insPayAppRevert", params);
    }

    public void insUseEtaxInfo(Map<String, Object> map) {
        insert("payApp.insUseEtaxInfo", map);
    }

    public void delUseEtaxInfo(Map<String, Object> payAppInfo) {
        delete("payApp.delUseEtaxInfo", payAppInfo);
    }

    public int getExnpCheck(Map<String, Object> data) {
        return (int) selectOneMs("g20.getExnpCheck", data);
    }

    public List<Map<String, Object>> getPayDepoFileList(Map<String, Object> params) {
        return selectList("payApp.getPayDepoFileList", params);
    }

    public List<Map<String, Object>> getPayIncpFileList(Map<String, Object> params) {
        return selectList("payApp.getPayIncpFileList", params);
    }
}
