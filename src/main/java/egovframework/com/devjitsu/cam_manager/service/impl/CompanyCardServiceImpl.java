package egovframework.com.devjitsu.cam_manager.service.impl;

import egovframework.com.devjitsu.cam_manager.repository.CompanyCardRepository;
import egovframework.com.devjitsu.cam_manager.service.CompanyCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CompanyCardServiceImpl implements CompanyCardService {

    @Autowired
    private CompanyCardRepository companyCardRepository;

    @Override
    public List<Map<String, Object>> cardUseList(Map<String, Object> params) {
        return companyCardRepository.cardUseList(params);
    }

    @Override
    public Map<String, Object> useCardDetailInfo(Map<String, Object> params) {
        return companyCardRepository.useCardDetailInfo(params);
    }

    @Override
    public List<Map<String, Object>> getCardTOData(Map<String, Object> params) {
        return companyCardRepository.getCardTOData(params);
    }

    @Override
    public void saveRegCardTo(Map<String, Object> params) {
        companyCardRepository.saveRegCardTo(params);
    }

    @Override
    public void delCardTo(Map<String, Object> params) {
        companyCardRepository.delCardTo(params);
    }
}
