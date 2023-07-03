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
    public void setCertificateInsert(Map<String, Object> params) {
        insert("certificate.setCertificateInsert", params);
    }
}
