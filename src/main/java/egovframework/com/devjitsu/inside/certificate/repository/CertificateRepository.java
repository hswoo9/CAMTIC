package egovframework.com.devjitsu.inside.certificate.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CertificateRepository extends AbstractDAO {

    public List<Map<String, Object>> getCertificateList(Map<String, Object> params) {
        return selectList("certificate.getCertificateList", params);
    }

    public Map<String, Object> getCertificateOne(Map<String, Object> params) {
        return (Map<String, Object>)selectOne("certificate.getCertificateOne", params);
    }

    public void setCertificateInsert(Map<String, Object> params) {
        insert("certificate.setCertificateInsert", params);
    }

    public void setCertificateUpdate(Map<String, Object> params) {
        insert("certificate.setCertificateUpdate", params);
    }

    public void updateCertifiApprStat(Map<String, Object> params) {
        update("certificate.updateCertifiApprStat", params);
    }

    public void updateCertifiFinalApprStat(Map<String, Object> params) {
        update("certificate.updateCertifiFinalApprStat", params);
    }

    public void setReqCert(Map<String, Object> params) {
        update("certificate.setReqCert", params);
    }
}
