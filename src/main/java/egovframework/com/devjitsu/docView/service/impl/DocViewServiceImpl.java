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

    @Override
    public void saveDisAsset(Map<String, Object> params) {
        if(params.containsKey("disAssetSn")){
            docViewRepository.updateDisAsset(params);
        } else {
            docViewRepository.insertDisAsset(params);
        }
    }

    @Override
    public Map<String, Object> getDisAssetData(Map<String, Object> params) {
        return docViewRepository.getDisAssetData(params);
    }

    @Override
    public List<Map<String, Object>> getDisAssetList(Map<String, Object> params) {
        return docViewRepository.getDisAssetList(params);
    }

    @Override
    public void delDisAsset(Map<String, Object> params) {
        docViewRepository.delDisAsset(params);
    }

    @Override
    public void saveResign(Map<String, Object> params) {
        if(params.containsKey("resignSn")){
            docViewRepository.updateResign(params);
        } else {
            docViewRepository.insertResign(params);
        }
    }

    @Override
    public Map<String, Object> getResignData(Map<String, Object> params) {
        return docViewRepository.getResignData(params);
    }

    @Override
    public Map<String, Object> getEmpData(Map<String, Object> params) {
        return docViewRepository.getEmpData(params);
    }

    @Override
    public List<Map<String, Object>> getResignList(Map<String, Object> params) {
        return docViewRepository.getResignList(params);
    }

    @Override
    public void delResign(Map<String, Object> params) {
        docViewRepository.delResign(params);
    }

    @Override
    public void saveDetails(Map<String, Object> params) {
        if(params.containsKey("#detSn")){
            docViewRepository.updateDetails(params);
        } else {
            docViewRepository.insertDetails(params);
        }
    }

    @Override
    public Map<String, Object> getDetailsData(Map<String, Object> params) {
        return docViewRepository.getDetailsData(params);
    }

    @Override
    public List<Map<String, Object>> getDetailsList(Map<String, Object> params) {
        return docViewRepository.getDetailsList(params);
    }

    @Override
    public void delDetails(Map<String, Object> params) {
        docViewRepository.delDetails(params);
    }

    @Override
    public void saveCond(Map<String, Object> params) {
        if(params.containsKey("condSn")){
            docViewRepository.updateCond(params);
        } else {
            docViewRepository.insertCond(params);
        }
    }

    @Override
    public Map<String, Object> getCondData(Map<String, Object> params) {
        return docViewRepository.getCondData(params);
    }

    @Override
    public List<Map<String, Object>> getCondList(Map<String, Object> params) {
        return docViewRepository.getCondList(params);
    }

    @Override
    public void delCond(Map<String, Object> params) {
        docViewRepository.delCond(params);
    }
}
