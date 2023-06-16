package egovframework.com.devjitsu.inside.asset.service.Impl;

import egovframework.com.devjitsu.inside.asset.repository.AssetRepository;
import egovframework.com.devjitsu.inside.asset.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRepository assetRepository;

    @Override
    public void setEquipmentInsert(Map<String, Object> params) {
        assetRepository.setEquipmentInsert(params);
    }

    @Override
    public List<Map<String, Object>> getTest(Map<String, Object> params) {
        return assetRepository.getTest(params);
    }

    /*@Override
    public List<Map<String,Object>> getEqipmnList(Map<String, Object> params) {
        return assetRepository.getEqipmnList(params);
    }*/

}
