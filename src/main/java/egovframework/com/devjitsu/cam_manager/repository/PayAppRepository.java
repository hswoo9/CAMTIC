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

    public List<Map<String, Object>> getPayAppDetailDataDupl(Map<String, Object> params) {
        return selectList("payApp.getPayAppDetailDataDupl", params);
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

    public List<Map<String, Object>> getExnpReListForExcelDown(Map<String, Object> params) {
        return selectList("payApp.getExnpReListForExcelDown", params);
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

    public void updClaimExnpInfo(Map<String, Object> params) {
        update("payApp.updClaimExnpInfo", params);
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

    public void updBusinessByPayAppSn(Map<String, Object> params) {
        update("payApp.updBusinessByPayAppSn", params);
    }

    public void updBustripExnpFileCopy(Map<String, Object> params) {
        insert("payApp.updBustripExnpFileCopy", params);
    }

    public void updSnackExnpFileCopy(Map<String, Object> params) {
        insert("payApp.updSnackExnpFileCopy", params);
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
    public List<Map<String, Object>> getPayAppDocFileList(Map<String, Object> params) {
        return selectList("payApp.getPayAppDocFileList", params);
    }

    public List<Map<String, Object>> getPayAppDocFileList2(Map<String, Object> params) {
        return selectList("payApp.getPayAppDocFileList2", params);
    }

    public void delPayAppFileList(Map<String, Object> params) {
        delete("payApp.delPayAppFileList", params);
    }

    public Map<String, Object> getPayAppInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getPayAppInfo", params);
    }

    public int getUseCardInfoCheck(Map<String, Object> payAppInfo) {
        return (int) selectOne("payApp.getUseCardInfoCheck", payAppInfo);
    }

    public int getUseEtaxInfoCheck(Map<String, Object> payAppInfo) {
        return (int) selectOne("payApp.getUseEtaxInfoCheck", payAppInfo);
    }

    public List<Map<String, Object>> getUseCardInfoList(Map<String, Object> payAppInfo) {
        return selectList("payApp.getUseCardInfoList", payAppInfo);
    }

    public List<Map<String, Object>> getUseEtaxInfoList(Map<String, Object> payAppInfo) {
        return selectList("payApp.getUseEtaxInfoList", payAppInfo);
    }

    public void insUseCardInfo(Map<String, Object> payAppInfo) {
        insert("payApp.insUseCardInfo", payAppInfo);
    }

    public void updUseCardPayApp(Map<String, Object> payAppInfo) {
        update("payApp.updUseCardPayApp", payAppInfo);
    }

    public void updUseEtaxPayApp(Map<String, Object> payAppInfo) {
        update("payApp.updUseEtaxPayApp", payAppInfo);
    }

    public void updUseCardPayAppNull(Map<String, Object> payAppInfo) {
        update("payApp.updUseCardPayAppNull", payAppInfo);
    }

    public void updUseEtaxPayAppNull(Map<String, Object> payAppInfo) {
        update("payApp.updUseEtaxPayAppNull", payAppInfo);
    }

    public void delUseCardInfo(Map<String, Object> payAppInfo) {
        delete("payApp.delUseCardInfo", payAppInfo);
    }
    public void delBustripUseCardInfo(Map<String, Object> payAppInfo) {
        delete("payApp.delBustripUseCardInfo", payAppInfo);
    }

    public void delBusiUseCardInfo(Map<String, Object> payAppInfo) {
        delete("payApp.delBusiUseCardInfo", payAppInfo);
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

    public List<Map<String, Object>> getStoredPayIncpFileList(Map<String, Object> params) {
        return selectList("payApp.getStoredPayIncpFileList", params);
    }

    public void delPayIncpFileList(Map<String, Object> params) {
        delete("payApp.delPayIncpFileList", params);
    }

    public List<Map<String, Object>> getPayExnpFileList(Map<String, Object> params) {
        return selectList("payApp.getPayExnpFileList", params);
    }

    public List<Map<String, Object>> getRegIncmReData(Map<String, Object> params) {
        return selectList("payApp.getRegIncmReData", params);
    }

    public void insIncpRe(Map<String, Object> params) {
        insert("payApp.insIncpRe", params);
    }

    public void updIncpRe(Map<String, Object> params) {
        update("payApp.updIncpRe", params);
    }

    public Map<String, Object> getPayIncpReData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getPayIncpReData", params);
    }

    public void updIncpReStat(Map<String, Object> data) {
        update("payApp.updIncpReStat", data);
    }

    public List<Map<String, Object>> getIncpReG20List(Map<String, Object> params) {
        return selectList("payApp.getIncpReG20List", params);
    }

    public void updIncpMasterStat(Map<String, Object> data) {
        update("payApp.updIncpMasterStat", data);
    }

    public void updClaimExnpSn(Map<String, Object> params) {
        update("payApp.updClaimExnpSn", params);
    }

    public List<Map<String, Object>> getClaimExnpData(Map<String, Object> params) {
        return selectList("payApp.getClaimExnpData", params);
    }

    public void updCardToPayApp(Map<String, Object> params) {
        update("payApp.updCardToPayApp", params);
    }

    public Map<String, Object> getPartRatePayBsYm(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getPartRatePayBsYm", params);
    }

    public void insPayAppBsYm(Map<String, Object> params) { insert("payApp.insPayAppBsYm", params); }
    public void updPayAppBsYm(Map<String, Object> params) { update("payApp.updPayAppBsYm", params); }

    public void delPayAppBsYm(Map<String, Object> params) { delete("payApp.delPayAppBsYm", params); }

    public void delExnpData(Map<String, Object> params) {
        delete("payApp.delExnpData", params);
    }

    public void delExnpDetData(Map<String, Object> params) {
        delete("payApp.delExnpDetData", params);
    }

    public void updPayAppExnpStatus(Map<String, Object> map) {
        update("payApp.updPayAppExnpStatus", map);
    }

    public List<Map<String, Object>> getCompletePaymentList(Map<String, Object> params) {
        return selectList("payApp.getCompletePaymentList", params);
    }

    public List<Map<String, Object>> getApprovePaymentList(Map<String, Object> params) {
        return selectList("payApp.getApprovePaymentList", params);
    }

    public List<Map<String, Object>> getWaitPaymentIncpList(Map<String, Object> params) {
        return selectList("payApp.getWaitPaymentIncpList", params);
    }

    public List<Map<String, Object>> getApprovePaymentIncpList(Map<String, Object> params) {
        return selectList("payApp.getApprovePaymentIncpList", params);
    }

    public List<Map<String, Object>> getReturnPaymentList(Map<String, Object> params) {
        return selectList("payApp.getReturnPaymentList", params);
    }

    public Map<String, Object> getExnpDetOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getExnpDetOne", params);
    }

    public void updExnpReStat(Map<String, Object> params) {
        update("payApp.updExnpReStat", params);
    }

    public void resolutionExnpReStatus(Map<String, Object> params) {
        update("payApp.resolutionExnpReStatus", params);
    }

    public void updateExnpDe(Map<String, Object> params) {
        update("payApp.updateExnpDe", params);
    }

    public void resolutionIncpReStatus(Map<String, Object> params) {
        update("payApp.resolutionIncpReStatus", params);
    }

    public void updExnpNullStat(Map<String, Object> params) {
        update("payApp.updExnpNullStat", params);
    }

    public Map<String, Object> getIncpDetOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getIncpDetOne", params);
    }

    public List<Map<String, Object>> getCompleteIncpList(Map<String, Object> params) {
        return selectList("payApp.getCompleteIncpList", params);
    }

    public void delIncpData(Map<String, Object> params) {
        delete("payApp.delIncpData", params);
    }

    public void delIncpDetData(Map<String, Object> params) {
        delete("payApp.delIncpDetData", params);
    }

    public void delIncpRe(Map<String, Object> params) {
        delete("payApp.delIncpRe", params);
    }
}
