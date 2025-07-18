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
    public void updateCondApprStat(Map<String, Object> params) {
        update("docViewProcess.updateCondApprStat", params);
    }
    public void updateCondFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updateCondFinalApprStat", params);
    }
    public void updateLeaveApprStat(Map<String, Object> params) {
        update("docViewProcess.updateLeaveApprStat", params);
    }
    public void updateLeaveFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updateLeaveFinalApprStat", params);
    }
    public void updateReinstatApprStat(Map<String, Object> params) {
        update("docViewProcess.updateReinstatApprStat", params);
    }
    public void updateReinstatFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updateReinstatFinalApprStat", params);
    }
    public void updatePoemApprStat(Map<String, Object> params) {
        update("docViewProcess.updatePoemApprStat", params);
    }
    public void updatePoemFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updatePoemFinalApprStat", params);
    }
}
