package egovframework.com.devjitsu.cam_item.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ItemManageService {

    void receivingExcelFormDown(HttpServletRequest request, HttpServletResponse response) throws IOException;
    List<Map<String, Object>> receivingExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception;
    void setReceivingReg(Map<String, Object> params);
    List<Map<String, Object>> getItemWhInfoList(Map<String, Object> params);
    void setInspectionUpd(Map<String, Object> params);
    List<Map<String, Object>> getItemInvenList(Map<String, Object> params);
    Map<String, Object> getItemInven(Map<String, Object> params);
    void setInvenTransferReg(Map<String, Object> params);
}
