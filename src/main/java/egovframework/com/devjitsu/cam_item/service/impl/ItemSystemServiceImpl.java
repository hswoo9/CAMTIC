package egovframework.com.devjitsu.cam_item.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_item.repository.ItemSystemRepository;
import egovframework.com.devjitsu.cam_item.service.ItemSystemService;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ItemSystemServiceImpl implements ItemSystemService {

    @Autowired
    private ItemSystemRepository itemSystemRepository;

    @Override
    public List<Map<String, Object>> getCrmItemManageList(Map<String, Object> params) {
        return itemSystemRepository.getCrmItemManageList(params);
    }

    @Override
    public void setCrmItemManage(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> newArr = gson.fromJson((String) params.get("newArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(newArr.size() > 0){
            params.put("newArr", newArr);
            itemSystemRepository.setCrmItemManage(params);
        }
        List<Map<String, Object>> oldArr = gson.fromJson((String) params.get("oldArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(oldArr.size() > 0){
            for(Map<String, Object> map : oldArr){
                itemSystemRepository.setCrmItemManageUpd(map);
            }
        }
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
    public void insItemCode(Map<String, Object> params) {
        itemSystemRepository.insItemCode(params);
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
    public boolean getItemNoDuplicate(Map<String, Object> params) {
        return itemSystemRepository.getItemNoDuplicate(params);
    }

    @Override
    public void setItemMasterReg(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("masterSn"))){
            itemSystemRepository.setItemMasterReg(params);
        }else{
            itemSystemRepository.setItemMasterRegUpd(params);
        }
    }

    @Override
    public void setItemMasterDel(Map<String, Object> params) {
        itemSystemRepository.setItemMasterDel(params);
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
}
