package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

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
        return selectList("payApp.getPayAppDetailData", params);
    }

    public List<Map<String, Object>> getPaymentList(Map<String, Object> params) {
        return selectList("payApp.getPaymentList", params);
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

    public void updPayAppDetailStatus(Map<String, Object> params) {
        update("payApp.updPayAppDetailStatus", params);
    }

    public void updateExnpApprStat(Map<String, Object> params) {
        update("payApp.updateExnpApprStat", params);
    }

    public void updateExnpFinalApprStat(Map<String, Object> params) {
        update("payApp.updateExnpFinalApprStat", params);
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

    public void updExnpStat(Map<String, Object> data) {
        update("payApp.updExnpStat", data);
    }
}
