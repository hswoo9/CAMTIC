package egovframework.com.devjitsu.inside.asset.service;

import java.util.List;
import java.util.Map;

public interface AssetService {

    void setEquipmentInsert(Map<String, Object> params);

    List<Map<String, Object>> getTest(Map<String, Object> params);

    /*List<Map<String, Object>> getEqipmnList(Map<String, Object> params);*/
}
