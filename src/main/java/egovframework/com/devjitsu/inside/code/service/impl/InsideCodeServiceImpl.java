package egovframework.com.devjitsu.inside.code.service.impl;

import egovframework.com.devjitsu.inside.code.repository.InsideCodeRepository;
import egovframework.com.devjitsu.inside.code.service.InsideCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class InsideCodeServiceImpl implements InsideCodeService {

    @Autowired
    private InsideCodeRepository insideCodeRepository;

    @Override
    public List<Map<String, Object>> getCarCode(Map<String, Object> params) {
        return insideCodeRepository.getCarCode(params);
    }

    @Override
    public Map<String, Object> getCarRequestInfo(Map<String, Object> params) {
        return insideCodeRepository.getCarRequestInfo(params);
    }

    @Override
    public List<Map<String, Object>> getCarRequestList(Map<String, Object> params) {
        return insideCodeRepository.getCarRequestList(params);
    }

    @Override
    public List<Map<String, Object>> searchDuplicateCar(Map<String, Object> params) {
        return insideCodeRepository.searchDuplicateCar(params);
    }

    @Override
    public Map<String, Object> getCarCodeInfo(Map<String, Object> params) {
        return insideCodeRepository.getCarCodeInfo(params);
    }

    @Override
    public List<Map<String, Object>> getCarCodeList(Map<String, Object> params) {
        return insideCodeRepository.getCarCodeList(params);
    }



    @Override
    public void setCarRequestInsert(Map<String, Object> params) {
        insideCodeRepository.setCarRequestInsert(params);
    }

    @Override
    public void setCarRequestUpdate(Map<String, Object> params) {
        insideCodeRepository.setCarRequestUpdate(params);
    }

    @Override
    public void setCarCodeInsert(Map<String, Object> params) {
        insideCodeRepository.setCarCodeInsert(params);
    }

    @Override
    public void setCarCodeUpdate(Map<String, Object> params) {
        insideCodeRepository.setCarCodeUpdate(params);
    }
}
