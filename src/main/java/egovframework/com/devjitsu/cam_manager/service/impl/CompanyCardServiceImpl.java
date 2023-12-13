package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
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

    @Override
    public Map<String, Object> getCardToInfo(Map<String, Object> params) {
        return companyCardRepository.getCardToInfo(params);
    }

    @Override
    public void updRegCardTo(Map<String, Object> params) {
        companyCardRepository.updRegCardTo(params);
    }

    @Override
    public void setUseCardHist(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> item : itemArr) {
            companyCardRepository.insUseCardHist(item);
        }
    }

    @Override
    public List<Map<String, Object>> cardToUseList(Map<String, Object> params) {
        return companyCardRepository.cardToUseList(params);
    }

    @Override
    public List<Map<String, Object>> getCardTOHistList(Map<String, Object> params) {
        return companyCardRepository.getCardTOHistList(params);
    }

    @Override
    public void updCardFromDe(Map<String, Object> params) {
        companyCardRepository.updCardFromDe(params);
    }
}
