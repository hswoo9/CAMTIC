package egovframework.com.devjitsu.inside.certificate.service.impl;

import egovframework.com.devjitsu.inside.certificate.repository.CertificateRepository;
import egovframework.com.devjitsu.inside.certificate.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CertificateServiceImpl implements CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Override
    public List<Map<String, Object>> getCertificateList(Map<String, Object> params){
        return certificateRepository.getCertificateList(params);
    }

    @Override
    public Map<String, Object> getCertificateOne(Map<String, Object> params){
        return certificateRepository.getCertificateOne(params);
    }

    @Override
    public void setCertificateInsert(Map<String, Object> params) {
        certificateRepository.setCertificateInsert(params);
    }

    @Override
    public void setCertificateUpdate(Map<String, Object> params) {
        certificateRepository.setCertificateUpdate(params);
    }
}
