package egovframework.com.devjitsu.cam_item.service.impl;

import egovframework.com.devjitsu.cam_item.repository.ItemManageRepository;
import egovframework.com.devjitsu.cam_item.repository.ItemSystemRepository;
import egovframework.com.devjitsu.cam_item.service.ItemSystemService;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ItemSystemServiceImpl implements ItemSystemService {

    @Autowired
    private ItemSystemRepository itemSystemRepository;

    @Autowired
    private ItemManageRepository itemManageRepository;

    @Override
    public List<Map<String, Object>> getCrmItemManageList(Map<String, Object> params) {
        return itemSystemRepository.getCrmItemManageList(params);
    }

    @Override
    public void setCrmItemManageDel(Map<String, Object> params) {
        itemSystemRepository.setCrmItemManageDel(params);
    }

    @Override
    public List<Map<String, Object>> groupCodeList(Map<String, Object> params) {
        return itemSystemRepository.groupCodeList(params);
    }

    @Override
    public void saveGroupCode(Map<String, Object> params) {
        itemSystemRepository.saveGroupCode(params);
    }

    @Override
    public List<Map<String, Object>> codeList(Map<String, Object> params) {
        return itemSystemRepository.codeList(params);
    }

    @Override
    public void insSetLgCode(Map<String, Object> params) {
        itemSystemRepository.insSetLgCode(params);
    }

    @Override
    public List<Map<String, Object>> smCodeList(Map<String, Object> params) {
        return itemSystemRepository.smCodeList(params);
    }

    @Override
    public Map<String, Object> insItemCode(Map<String, Object> params) {

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> map = new HashMap<>();
        map = itemSystemRepository.getItemCodeCheck(params);

        if(map != null){
            result.put("code", 500);
        } else {
            result.put("code", 200);
            if(params.containsKey("itemCdSn")){
                itemSystemRepository.updItemCode(params);
            } else {
                itemSystemRepository.insItemCode(params);
            }
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> selLgCode(Map<String, Object> params) {
        return itemSystemRepository.selLgCode(params);
    }

    @Override
    public List<Map<String, Object>> selSmCode(Map<String, Object> params) {
        return itemSystemRepository.selSmCode(params);
    }

    @Override
    public List<Map<String, Object>> selLgSmCode(Map<String, Object> params) {
        List<Map<String, Object>> lgSmList = itemSystemRepository.selLgCode(params);
        for(Map<String, Object> map : lgSmList){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("grpSn", params.get("grpSn"));
            searchMap.put("lgCd", map.get("LG_CD"));
            map.put("smList", itemSystemRepository.selSmCode(searchMap));
        }

        return lgSmList;
    }

    @Override
    public List<Map<String, Object>> getItemMasterList(Map<String, Object> params) {
        return itemSystemRepository.getItemMasterList(params);
    }

    @Override
    public Map<String, Object> getItemMaster(Map<String, Object> params) {
        return itemSystemRepository.getItemMaster(params);
    }

    @Override
    public Map<String, Object> getItemNoDuplicate(Map<String, Object> params) {
        return itemSystemRepository.getItemNoDuplicate(params);
    }

    @Override
    public void setItemMasterReg(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("masterSn"))){
            itemSystemRepository.setItemMasterReg(params);

            params.put("changeNum", itemManageRepository.getMaxChangeNum(params));
            params.put("startDt", params.get("nowHyphen"));
            itemManageRepository.setSdUnitPriceReg(params);
        }else{
            itemSystemRepository.setItemMasterRegUpd(params);
        }
    }

    @Override
    public void setItemMasterDel(Map<String, Object> params) {
        itemSystemRepository.setItemMasterDel(params);
    }

    @Override
    public List<Map<String, Object>> getItemCategoryList(Map<String, Object> params) {
        return itemSystemRepository.getItemCategoryList(params);
    }

    @Override
    public Map<String, Object> getItemCategoryOne(Map<String, Object> params) {
        return itemSystemRepository.getItemCategoryOne(params);
    }

    @Override
    public boolean getCgDuplicateChk(Map<String, Object> params) {
        return itemSystemRepository.getCgDuplicateChk(params);
    }

    @Override
    public void setItemCategoryReg(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("itemCgSn"))){
            itemSystemRepository.setItemCategoryReg(params);
        }else{
            itemSystemRepository.setItemCategoryRegUpd(params);
        }
    }

    @Override
    public void setItemCategoryDel(Map<String, Object> params) {
        itemSystemRepository.setItemCategoryDel(params);
    }

    @Override
    public void delDetCode(Map<String, Object> params) {
        itemSystemRepository.delDetCode(params);
    }

    public String cellValueToString(XSSFCell cell){
        String txt = "";

        try {
            if(cell.getCellType() == XSSFCell.CELL_TYPE_STRING){
                txt = cell.getStringCellValue();
            }else if(cell.getCellType() == XSSFCell.CELL_TYPE_NUMERIC){
                if( DateUtil.isCellDateFormatted(cell)) {
                    Date date = cell.getDateCellValue();
                    txt = new SimpleDateFormat("yyyy-MM-dd").format(date);
                }else{
                    txt = String.valueOf( Math.round(cell.getNumericCellValue()) );
                }
            }else if(cell.getCellType() == XSSFCell.CELL_TYPE_FORMULA){
                txt = cell.getCellFormula();
            }
        } catch (Exception e) {

        }
        return txt;
    }

    @Override
    public Map<String, Object> getItemNo(Map<String, Object> params) {
        return itemSystemRepository.getItemNo(params);
    }
}
