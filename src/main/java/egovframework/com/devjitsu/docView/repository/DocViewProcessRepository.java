package egovframework.com.devjitsu.docView.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class DocViewProcessRepository extends AbstractDAO {
    public void updateCardLossApprStat(Map<String, Object> params) {
        update("docViewProcess.updateCardLossApprStat", params);
    }
    public void updateCardLossFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updateCardLossFinalApprStat", params);
    }
    public void updateAccCertApprStat(Map<String, Object> params) {
        update("docViewProcess.updateAccCertApprStat", params);
    }
    public void updateAccCertFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updateAccCertFinalApprStat", params);
    }
    public void updateSignetToApprStat(Map<String, Object> params) {
        update("docViewProcess.updateSignetToApprStat", params);
    }
    public void updateSignetToFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updateSignetToFinalApprStat", params);
    }
    public void updateDisAssetApprStat(Map<String, Object> params) {
        update("docViewProcess.updateDisAssetApprStat", params);
    }
    public void updateDisAssetFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updateDisAssetFinalApprStat", params);
    }
    public void updateResignApprStat(Map<String, Object> params) {
        update("docViewProcess.updateResignApprStat", params);
    }
    public void updateResignFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updateResignFinalApprStat", params);
    }
    public void updateDetailsApprStat(Map<String, Object> params) {
        update("docViewProcess.updateDetailsApprStat", params);
    }
    public void updateDetailsFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updateDetailsFinalApprStat", params);
    }
}
