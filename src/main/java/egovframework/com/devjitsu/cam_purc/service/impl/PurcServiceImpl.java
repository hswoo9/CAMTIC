package egovframework.com.devjitsu.cam_purc.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_manager.repository.ManageRepository;
import egovframework.com.devjitsu.cam_purc.repository.PurcRepository;
import egovframework.com.devjitsu.cam_purc.service.PurcService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.font.GlyphVector;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PurcServiceImpl implements PurcService {


    @Autowired
    private PurcRepository purcRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getPurcReqList(Map<String, Object> params) {
        return purcRepository.getPurcReqList(params);
    }

    @Override
    public void setPurcReq(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        if(StringUtils.isEmpty(params.get("purcSn"))){
            purcRepository.setPurcReq(params);
        }else{
            purcRepository.setPurcReqUpd(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 견적서 파일 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("contentId", "est_" + params.get("purcSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);
            }
        }

        /** 요청서 파일 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("contentId", "req_" + params.get("purcSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));

                commonRepository.insOneFileInfo(fileInsMap);
            }
        }

        purcRepository.delPurcItem(params);
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        for(Map<String, Object> map : itemArr){
            map.put("purcSn", params.get("purcSn"));
            purcRepository.setPurcItem(map);
        }

    }

    @Override
    public Map<String, Object> getPurcReq(Map<String, Object> params) {
        Map<String, Object> returnMap = purcRepository.getPurcReq(params);

        if(returnMap != null){
            returnMap.put("itemList", purcRepository.getPurcItemList(params));

            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("contentId", "est_" + params.get("purcSn"));
            returnMap.put("estFile", purcRepository.getPurcReqFileInfo(searchMap));
            searchMap.put("contentId", "req_" + params.get("purcSn"));
            returnMap.put("reqFile", purcRepository.getPurcReqFileInfo(searchMap));
            searchMap.put("contentId", "inspect_" + params.get("purcSn"));
            returnMap.put("inspectFile", purcRepository.getPurcReqFileList(searchMap));
        }

        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getPurcItemList(Map<String, Object> params) {
        return purcRepository.getPurcItemList(params);
    }

    @Override
    public List<Map<String, Object>> getClaimItemList(Map<String, Object> params) {
        return purcRepository.getPurcClaimItemList(params);
    }

    @Override
    public Map<String, Object> getPurcItemAmtTotal(Map<String, Object> params) {
        return purcRepository.getPurcItemAmtTotal(params);
    }

    @Override
    public Map<String, Object> getPurcClaimItemAmtTotal(Map<String, Object> params) {
        return purcRepository.getPurcClaimItemAmtTotal(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public void updatePurcDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("purcSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            purcRepository.updatePurcApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            purcRepository.updatePurcApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            purcRepository.updatePurcFinalApprStat(params);
            purcRepository.updatePurcListFinalApprStat(params);
        }
    }

    @Override
    public void updateClaimDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("claimSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            purcRepository.updateClaimApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            purcRepository.updateClaimApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            purcRepository.updateClaimFinalApprStat(params);
        }
    }

    @Override
    public List<Map<String, Object>> getMngReqPurcList(Map<String, Object> params) {
        return purcRepository.getMngReqPurcList(params);
    }

    @Override
    public void setPurcItemStat(Map<String, Object> params) {
        purcRepository.updPurcItemStat(params);
    }

    @Override
    public void setPurcClaimData(Map<String, Object> params) {
        Map<String, Object> claimMap = purcRepository.getPurcClaimData(params);

        if(claimMap == null){
            purcRepository.insPurcClaimData(params);
        }else{
            params.put("claimSn", claimMap.get("CLAIM_SN"));
            purcRepository.updPurcClaimData(params);
        }

        purcRepository.delPurcClaimItem(params);

        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        for(Map<String, Object> map : itemArr){
            map.put("claimSn", params.get("claimSn"));

            purcRepository.insPurcClaimItem(map);
        }
    }

    @Override
    public Map<String, Object> getPurcClaimData(Map<String, Object> params) {
        Map<String, Object> result = purcRepository.getPurcClaimData(params);

        if(result != null){
            result.put("itemList", purcRepository.getPurcClaimItemList(params));
        }
        return result;
    }

    @Override
    public List<Map<String, Object>> getPurcClaimList(Map<String, Object> params) {
        return purcRepository.getPurcClaimList(params);
    }

    @Override
    public Map<String, Object> getPurcClaimItemData(Map<String, Object> params) {
        Map<String, Object> result = purcRepository.getPurcClaimItemData(params);
        return result;
    }

    @Override
    public List<Map<String, Object>> getPurcAssetList(Map<String, Object> params) {
        return purcRepository.getPurcAssetList(params);
    }

    @Override
    public Map<String, Object> getPurcSum(Map<String, Object> params) {
        return purcRepository.getPurcSum(params);
    }

    @Override
    public List<Map<String, Object>> getPurcProductList(Map<String, Object> params) {
        return purcRepository.getPurcProductList(params);
    }

    @Override
    public void updPurcInspect(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        /** 검수 파일 */
        String strWText = "Camtic";
        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "inspect_" + params.get("purcSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);

                if("jpg".equals(list.get(i).get("fileExt")) || "JPG".equals(list.get(i).get("fileExt")) || "png".equals(list.get(i).get("fileExt")) || "PNG".equals(list.get(i).get("fileExt"))) {
                    System.out.println("=============================== Image WaterMark Start ===============================");
                    String fileExt = list.get(i).get("fileExt").toString();
                    try{
                        File sourceImageFile = new File("/home" + list.get(i).get("filePath").toString() + list.get(i).get("fileUUID").toString());
                        File destImageFile = sourceImageFile;


                        BufferedImage sourceImage = ImageIO.read(sourceImageFile);

                        Graphics2D g2d = (Graphics2D) sourceImage.getGraphics();

                        g2d.scale(1, 1);
                        g2d.addRenderingHints(
                                new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON));
                        g2d.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

                        Font font = new Font("나눔고딕", Font.PLAIN, 18);

                        GlyphVector fontGV = font.createGlyphVector(g2d.getFontRenderContext(), strWText);

                        Rectangle size = fontGV.getPixelBounds(g2d.getFontRenderContext(),0,0);

                        Shape textShape = fontGV.getOutline();

                        //double textWidth = size.getWidth();

                        double textWidth = size.getWidth();



                        //double textHeight = size.getHeight();

                        double textHeight = size.getHeight()*3; // 텍스트 간격이다.

                        //AffineTransform rotate45 = AffineTransform.getRotateInstance(Math.PI / 4d);

                        AffineTransform rotate45 = AffineTransform.getRotateInstance(Math.PI / 5d);

                        Shape rotatedText = rotate45.createTransformedShape(textShape);



                        // use a gradient that repeats 4 times

                        g2d.setPaint(new GradientPaint(0, 0,

                                new Color(0f, 0f, 0f, 0.1f),

                                sourceImage.getWidth() / 2, sourceImage.getHeight() / 2,

                                new Color(0f, 0f, 0f, 0.1f)));

                        //new Color(1f, 1f, 1f, 0.1f)));

                        //g2d.setStroke(new BasicStroke(0.5f));

                        g2d.setStroke(new BasicStroke(1f));



                        // step in y direction is calc'ed using pythagoras + 5 pixel padding

                        //double yStep = Math.sqrt(textWidth * textWidth / 2) + 2;

                        double yStep = Math.sqrt(textWidth * textWidth / 2); //



                        System.out.println("yStep : " + yStep);



                        // step over image rendering watermark text

                        //for (double x = -textHeight * 3; x < sourceImage.getWidth(); x += (textHeight * 3)) {



                        for (double x = -textHeight; x < sourceImage.getWidth()/2; x += textHeight) {



                            double y = -yStep;



                            for (; y < sourceImage.getHeight(); y += yStep) {

                                g2d.draw(rotatedText);

                                g2d.fill(rotatedText);

                                g2d.translate(0, yStep);

                            }



                            g2d.translate(textHeight * 3, -(y + yStep));

                        }



                        ImageIO.write(sourceImage, fileExt, destImageFile);

                        g2d.dispose();

                    } catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
            commonRepository.insFileInfo(list);
        }
        purcRepository.updPurcInspect(params);
    }

    @Override
    public void updPurcInspectStat(Map<String, Object> params) {
        purcRepository.updPurcInspectStat(params);
    }

    @Override
    public void updItemUnAssetStat(Map<String, Object> params) {
        purcRepository.updItemUnAssetStat(params);
    }

    @Override
    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return purcRepository.getCrmInfo(params);
    }

    @Override
    public void setOrderInfo(Map<String, Object> params) {
        purcRepository.setOrderInfo(params);
    }

    @Override
    public List<Map<String, Object>> getProjectPurcList(Map<String, Object> params) {
        return purcRepository.getProjectPurcList(params);
    }
}
