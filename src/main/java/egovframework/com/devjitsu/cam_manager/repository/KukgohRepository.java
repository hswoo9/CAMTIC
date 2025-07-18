package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class KukgohRepository extends AbstractDAO {


    public List<Map<String, Object>> getCmmnCodeList(Map<String, Object> params) {

        return selectList("kukgoh.getCmmnCodeList", params);
    }

    public List<Map<String, Object>> getCmmnCodeDetailList(Map<String, Object> params) {

        return selectList("kukgoh.getCmmnCodeDetailList", params);
    }

    public void delCommCodeObject(Map<String, Object> params) {

        delete("kukgoh.delCommCodeObject", params);
    }

    public void insCommCodeObject(Map<String, Object> params) {

        insert("kukgoh.insCommCodeObject", params);
    }

    public List<Map<String, Object>> getPayAppList(Map<String, Object> params) {

        return selectList("kukgoh.getPayAppList", params);
    }

    public void setEnaraSendExcept(Map<String, Object> params) {
        update("kukgoh.setEnaraSendExcept", params);
    }

    public void setEnaraMngStat(Map<String, Object> params) {
        update("kukgoh.setEnaraMngStat", params);
    }

    public List<Map<String, Object>> getEnaraBudgetCdList(Map<String, Object> params) {

        return selectList("kukgoh.getEnaraBudgetCdList", params);
    }

    public void delEnaraBudgetCode(Map<String, Object> params) {

        delete("kukgoh.delEnaraBudgetCode", params);
    }

    public void insEnaraBudgetCode(Map<String, Object> params) {
        insert("kukgoh.insEnaraBudgetCode", params);
    }

    public Map<String, Object> getEnaraBudgetCdData(Map<String, Object> item) {

        return (Map<String, Object>) selectOne("kukgoh.getEnaraBudgetCdData", item);
    }

    public void delBudgetCodeMatch(Map<String, Object> params) {

        delete("kukgoh.delBudgetCodeMatch", params);
    }

    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {

        return selectList("kukgoh.getProjectList", params);
    }

    public List<Map<String, Object>> getEnaraPjtList(Map<String, Object> params) {

        return selectList("kukgoh.getEnaraPjtList", params);
    }

    public void insEnaraProject(Map<String, Object> params) {

        insert("kukgoh.insEnaraProject", params);
    }

    public void delEnaraProject(Map<String, Object> params) {

        delete("kukgoh.delEnaraProject", params);
    }

    public Map<String, Object> getEnaraPjtData(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("kukgoh.getEnaraPjtData", params);
    }

    public Map<String, Object> getProjectDataByPayAppDetSn(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("kukgoh.getProjectDataByPayAppDetSn", params);
    }

    public Map<String, Object> getPayAppDataByPayAppDetSn(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("kukgoh.getPayAppDataByPayAppDetSn", params);
    }

    public Map<String, Object> getEnaraBgtDataByPayAppData(Map<String, Object> payAppData) {

        return (Map<String, Object>) selectOne("kukgoh.getEnaraBgtDataByPayAppData", payAppData);
    }

    public Map<String, Object> getEnaraExcDataByEnaraProjectData(Map<String, Object> projectInfo) {

        return (Map<String, Object>) selectOne("kukgoh.getEnaraExcDataByEnaraProjectData", projectInfo);
    }

    public Map<String, Object> getEnaraBankInfoByPayAppData(Map<String, Object> payAppData) {

        return (Map<String, Object>) selectOne("kukgoh.getEnaraBankInfoByPayAppData", payAppData);
    }

    public Map<String, Object> getCrmDataByPayAppData(Map<String, Object> payAppData) {

        return (Map<String, Object>) selectOne("kukgoh.getCrmDataByPayAppData", payAppData);
    }

    public List<Map<String, Object>> getEnaraBankList(Map<String, Object> params) {

        return selectList("kukgoh.getEnaraBankList", params);
    }

    public void setRequestKeyPayAppDet(Map<String, Object> params) {

        update("kukgoh.setRequestKeyPayAppDet", params);
    }

    public void insExcutRequstErp(Map<String, Object> params) {

        insert("kukgoh.insExcutRequstErp", params);
    }

    public void insExcutExpItmErp(Map<String, Object> params) {

        insert("kukgoh.insExcutExpItmErp", params);
    }

    public void insExcutFnrscErp(Map<String, Object> params) {

        insert("kukgoh.insExcutFnrscErp", params);
    }

    public List<Map<String, Object>> getExecRequestCsvList(Map<String, Object> params) {

        return selectList("kukgoh.getExecRequestCsvList", params);
    }

    public List<Map<String, Object>> getExecBimokCsvList(Map<String, Object> params) {

        return selectList("kukgoh.getExecBimokCsvList", params);
    }

    public List<Map<String, Object>> getExecBimokDataCsvList(Map<String, Object> params) {

        return selectList("kukgoh.getExecBimokDataCsvList", params);
    }

    public void insIntrfcFile(Map<String, Object> params) {

        insert("kukgoh.insIntrfcFile", params);
    }

    public List<Map<String, Object>> getIntrfcFileList(Map<String, Object> params) {

        return selectList("kukgoh.getIntrfcFileList", params);
    }

    public void insEnaraData(Map<String, Object> params) {

        insert("kukgoh.insEnaraData", params);
    }

    public void insEnaraSendTemp(Map<String, Object> params) {

        insert("kukgoh.insEnaraSendTemp", params);
    }

    public void delEnaraTempData(Map<String, Object> params) {

        delete("kukgoh.delEnaraTempData", params);
    }

    public Map<String, Object> getErpReqData(Map<String, Object> payAppData) {

        return (Map<String, Object>) selectOne("kukgoh.getErpReqData", payAppData);
    }

    public Map<String, Object> getReqStatData(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("kukgoh.getReqStatData", params);
    }

    public Map<String, Object> getErpTaxReqData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("kukgoh.getErpTaxReqData", params);
    }

    public Map<String, Object> getTaxReqStatData(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("kukgoh.getTaxReqStatData", params);
    }

    public void delExcutRequstErp(Map<String, Object> params) {

        delete("kukgoh.delExcutRequstErp", params);
    }

    public void delExcutExpItmErp(Map<String, Object> params) {

        delete("kukgoh.delExcutExpItmErp", params);
    }

    public void delExcutFnrscErp(Map<String, Object> params) {

        delete("kukgoh.delExcutFnrscErp", params);
    }

    public void delIntrfcFile(Map<String, Object> reqStatData) {

        delete("kukgoh.delIntrfcFile", reqStatData);
    }

    public Map<String, Object> getExcutRequestErp(Map<String, Object> enaraSendData) {

        return (Map<String, Object>) selectOne("kukgoh.getExcutRequestErp", enaraSendData);
    }

    public Map<String, Object> getExcutExpItmErp(Map<String, Object> enaraSendData) {

        return (Map<String, Object>) selectOne("kukgoh.getExcutExpItmErp", enaraSendData);
    }

    public Map<String, Object> getExcutFnrscErp(Map<String, Object> enaraSendData) {

        return (Map<String, Object>) selectOne("kukgoh.getExcutFnrscErp", enaraSendData);
    }

    public Map<String, Object> getErpSend(Map<String, Object> enaraSendData) {

        return (Map<String, Object>) selectOne("kukgoh.getErpSend", enaraSendData);
    }

    public Map<String, Object> getEranaTemp(Map<String, Object> enaraSendData) {

        return (Map<String, Object>) selectOne("kukgoh.getEranaTemp", enaraSendData);
    }

    public List<Map<String, Object>> getEnaraTempList() {

        return selectList("kukgoh.getEnaraTempList");
    }

    public void delEnaraData(Map<String, Object> params) {

        delete("kukgoh.delEnaraData", params);
    }

    public void insDjErpSend(Map<String, Object> resutMap) {

        insert("kukgoh.insDjErpSend", resutMap);
    }

    public void delErpSendTrscId(Map<String, Object> resutMap) {

        delete("kukgoh.delErpSendTrscId", resutMap);
    }

    public Map<String, Object> getErpSendTrscId(Map<String, Object> resutMap) {

        return (Map<String, Object>) selectOne("kukgoh.getErpSendTrscId", resutMap);
    }

    public Map<String, Object> getEtaxInfo(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("kukgoh.getEtaxInfo", params);
    }

    public void insEtaxData(Map<String, Object> parameters) {

        insert("kukgoh.insEtaxData", parameters);
    }

    public List<Map<String, Object>> getEtaxList(Map<String, Object> params) {

        return selectList("kukgoh.getEtaxList", params);
    }

    public Map<String, Object> sendResultEtaxData(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("kukgoh.sendResultEtaxData", params);
    }

    public Map<String, Object> getResEtsblData(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("kukgoh.getResEtsblData", params);
    }

    public List<Map<String, Object>> getInterfaceList(Map<String, Object> params) {

        return selectList("kukgoh.getInterfaceList", params);
    }

    public List<Map<String, Object>> getCardPuchasRecptnList(Map<String, Object> params) {

        return selectList("kukgoh.getCardPuchasRecptnList", params);
    }

    public void delEnaraTaxReq(Map<String, Object> params) {

        delete("kukgoh.delEnaraTaxReq", params);
    }

    public void insEnaraTaxReq(Map<String, Object> params) {

        insert("kukgoh.insEnaraTaxReq", params);
    }

    public void cancelEnaraMng(Map<String, Object> params) {
        // enara 미전송 처리
        update("kukgoh.cancelEnaraPayAppStatus", params);
        // enara 전송상태 삭제
        delete("kukgoh.cancelEnaraMng", params);
    }


    public void delEtxblRequstErp(Map<String, Object> params) {

        delete("kukgoh.delEtxblRequstErp", params);
    }
}
