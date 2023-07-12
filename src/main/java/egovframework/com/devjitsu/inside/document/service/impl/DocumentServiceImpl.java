package egovframework.com.devjitsu.inside.document.service.impl;

import egovframework.com.devjitsu.inside.document.repository.DocumentRepository;
import egovframework.com.devjitsu.inside.document.service.DocumentService;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public List<Map<String, Object>> getDocumentList(Map<String, Object> params){
        return documentRepository.getDocumentList(params);
    }

    @Override
    public List<Map<String, Object>> getDocuOrderList(Map<String, Object> params){
        return documentRepository.getDocuOrderList(params);
    }

    @Override
    public List<Map<String, Object>> getDocuContractList(Map<String, Object> params){
        return documentRepository.getDocuContractList(params);
    }

    @Override
    public List<Map<String, Object>> getSnackList(Map<String, Object> params){
        return documentRepository.getSnackList(params);
    }

    @Override
    public Map<String, Object> getSnackOne(Map<String, Object> params){
        return documentRepository.getSnackOne(params);
    }

    @Override
    public void setDocumentInsert(Map<String, Object> params) {
        documentRepository.setDocumentInsert(params);
    }

    @Override
    public void setDocuOrderInsert(Map<String, Object> params) {
        documentRepository.setDocuOrderInsert(params);
    }

    @Override
    public void setDocuContractInsert(Map<String, Object> params) {
        documentRepository.setDocuContractInsert(params);
    }

    @Override
    public void setSnackInsert(Map<String, Object> params) {
        documentRepository.setSnackInsert(params);
    }

    @Override
    public void setSnackReqCert(Map<String, Object> params) {
        documentRepository.setSnackReqCert(params);
    }
}
