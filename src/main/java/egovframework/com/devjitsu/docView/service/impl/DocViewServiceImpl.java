package egovframework.com.devjitsu.docView.service.impl;

import egovframework.com.devjitsu.docView.repository.DocViewRepository;
import egovframework.com.devjitsu.docView.service.DocViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;


@Service
public class DocViewServiceImpl implements DocViewService {

    @Autowired
    private DocViewRepository docViewRepository;

    @Override
    public List<Map<String, Object>> getCardLossList(Map<String, Object> params) {
        return docViewRepository.getCardLossList(params);
    }

    @Override
    public List<Map<String, Object>> getCardManager(Map<String, Object> params) {
        return docViewRepository.getCardManager(params);
    }

    @Override
    public void saveCardLoss(Map<String, Object> params) {
        if(params.containsKey("tpClSn")){
            docViewRepository.updateCardLoss(params);
        } else {
            docViewRepository.insertCardLoss(params);
        }
    }

    @Override
    public Map<String, Object> getCardLossData(Map<String, Object> params) {
        return docViewRepository.getCardLossData(params);
    }

    @Override
    public void delCardLossData(Map<String, Object> params) {
        docViewRepository.delCardLossData(params);
    }

    @Override
    public List<Map<String, Object>> getAccCertList(Map<String, Object> params) {
        return docViewRepository.getAccCertList(params);
    }

    @Override
    public void saveAccCert(Map<String, Object> params) {
        if(params.containsKey("accCertSn")){
            docViewRepository.updateAccCert(params);
        } else {
            docViewRepository.insertAccCert(params);
        }
    }

    @Override
    public Map<String, Object> getAccCertData(Map<String, Object> params) {
        return docViewRepository.getAccCertData(params);
    }

    @Override
    public void delAccCertData(Map<String, Object> params) {
        docViewRepository.delAccCertData(params);
    }

    @Override
    public void saveCorpBank(Map<String, Object> params) {
        if(params.containsKey("corpBankSn")){
            docViewRepository.updateCorpBank(params);
        } else {
            docViewRepository.insertCorpBank(params);
        }
    }

    @Override
    public Map<String, Object> getCorpBankData(Map<String, Object> params) {
        return docViewRepository.getCorpBankData(params);
    }

    @Override
    public List<Map<String, Object>> getCorpBankList(Map<String, Object> params) {
        return docViewRepository.getCorpBankList(params);
    }

    @Override
    public void delCorpBank(Map<String, Object> params) {
        docViewRepository.delCorpBank(params);
    }

    @Override
    public void saveCorpCard(Map<String, Object> params) {
        if(params.containsKey("corpCardSn")){
            docViewRepository.updateCorpCard(params);
        } else {
            docViewRepository.insertCorpCard(params);
        }
    }

    @Override
    public Map<String, Object> getCorpCardData(Map<String, Object> params) {
        return docViewRepository.getCorpCardData(params);
    }

    @Override
    public List<Map<String, Object>> getCorpCardList(Map<String, Object> params) {
        return docViewRepository.getCorpCardList(params);
    }

    @Override
    public void delCorpCard(Map<String, Object> params) {
        docViewRepository.delCorpCard(params);
    }

    @Override
    public void saveSignetTo(Map<String, Object> params) {
        if(params.containsKey("signSn")){
            docViewRepository.updateSignetTo(params);
        } else {
            docViewRepository.insertSignetTo(params);
        }

    }

    @Override
    public Map<String, Object> getSignetToData(Map<String, Object> params) {
        return docViewRepository.getSignetToData(params);
    }

    @Override
    public List<Map<String, Object>> getSignetToList(Map<String, Object> params) {
        return docViewRepository.getSignetToList(params);
    }

    @Override
    public void delSignetTo(Map<String, Object> params) {
        docViewRepository.delSignetTo(params);
    }
}
