package egovframework.com.devjitsu.hp.board.controller;

import egovframework.com.devjitsu.gw.user.controller.UserController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import egovframework.com.devjitsu.hp.board.service.BoardService;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
public class BoardController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private BoardService boardService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @Value("#{properties['File.Slash']}")
    private String slash;

    /**
     * 공지사항 페이지
     * */
    @RequestMapping("/camtic/news/notice.do")
    public String notice(Model model, ArticlePage articlePage){
        /*articlePage.setSearchCategory("notice");
        PagingResponse<PostResponse> response = boardService.selectBoardList(articlePage);
        model.addAttribute("boardArticleList", response);
        model.addAttribute("pagination", articlePage.getPagination());
        model.addAttribute("page", articlePage.getPage());*/
        /*model.addAttribute("boardCnt", boardService.selectBoardListCnt(articlePage));*/
        return "camtic/news/notice";
    }

    /**
     * 공통게시판 페이지
     * */
    @RequestMapping("/camtic/news/commonBoard.do")
    public String commonBoard(Model model, @RequestParam Map<String, Object> param){

        model.addAttribute("categoryKey", param.get("categoryKey"));
        return "camtic/news/commonBoard";
    }

    /**
     * 게시판 TABLE DATA
     * */
    @RequestMapping("/board/getBoardArticleList.do")
    public String getNormalBoardList(@RequestParam Map<String, Object> param, ArticlePage articlePage, HttpServletRequest request, Model model){

        articlePage.setSearchCategory((String) param.get("categoryId"));
        PagingResponse<PostResponse> response = boardService.selectBoardList(articlePage);

        model.addAttribute("boardArticleList", response);

        model.addAttribute("pagination", articlePage.getPagination());
        model.addAttribute("page", articlePage.getPage());
        /*model.addAttribute("boardCnt", boardService.selectBoardListCnt(articlePage));*/
        return "jsonView";
    }

    /**
     * 사업공고 페이지
     * */
    @RequestMapping("/camtic/news/business.do")
    public String business(Model model, HttpServletRequest request, ArticlePage articlePage){

        articlePage.setSearchCategory("business");
        PagingResponse<PostResponse> list = boardService.selectBoardList(articlePage);
        model.addAttribute("list", list);
        model.addAttribute("articlePage", articlePage);
        model.addAttribute("totalCnt", articlePage.getPagination());
        return "camtic/news/business";
    }
    /**
     * 교육/행사 페이지
     * */
    @RequestMapping("/camtic/news/study.do")
    public String study(Model model, HttpServletRequest request, ArticlePage articlePage){

        articlePage.setSearchCategory("study");
        PagingResponse<PostResponse> list = boardService.selectBoardList(articlePage);
        model.addAttribute("list", list);
        model.addAttribute("articlePage", articlePage);
        model.addAttribute("totalCnt", articlePage.getPagination());
        return "camtic/news/study";
    }

    /**
     * 유관기관소식 페이지
     * */
    @RequestMapping("/camtic/news/partner.do")
    public String partner(Model model, HttpServletRequest request, ArticlePage articlePage){

        articlePage.setSearchCategory("partner");
        PagingResponse<PostResponse> list = boardService.selectBoardList(articlePage);
        model.addAttribute("list", list);
        model.addAttribute("articlePage", articlePage);
        model.addAttribute("totalCnt", articlePage.getPagination());
        return "camtic/news/partner";
    }


    /**
     * 공지사항 상세보기 페이지
     * */
    @RequestMapping("/camtic/news/view.do")
    public String noticeView(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){
        boardService.setBoardArticleViewCount(params);

        Map<String, Object> map = boardService.selectBoard(params);
        List<Map<String, Object>> fileList = boardService.selectBoardFile(params);
        model.addAttribute("categoryId", params.get("category"));
        model.addAttribute("map", map);
        model.addAttribute("fileMap", fileList);
        return "camtic/news/view";
    }

    /**
     * 게시글 작성 페이지
     * */
    @RequestMapping("/camtic/news/write.do")
    public String noticeWrite(Model model, @RequestParam Map<String, Object> params){

        model.addAttribute("categoryId", params.get("category"));
        return "camtic/news/write";
    }

    /**
     * 게시글 수정 페이지
     * */
    @RequestMapping("/camtic/news/register.do")
    public String noticeRegister(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){
        Map<String, Object> map = boardService.selectBoard(params);

        model.addAttribute("categoryId", params.get("category"));
        model.addAttribute("map", map);
        return "camtic/news/register";
    }

    /**
     * 게시글 작성
     * */
    @RequestMapping("/camtic/news/insNotice.do")
    public String insNotice(Model model, @RequestParam Map<String, Object> params, MultipartHttpServletRequest request){
        MultipartFile[] file = request.getFiles("boardFile").toArray(new MultipartFile[0]);
        boardService.insertBoard(params, file, SERVER_DIR, BASE_DIR);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }

    /**
     * 게시글 수정
     * */
    @RequestMapping("/camtic/news/updNotice.do")
    public String updNotice(Model model, @RequestParam Map<String, Object> params){
        boardService.updateBoard(params);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }

    /**
     * 게시글 삭제
     * */
    @RequestMapping("/camtic/news/deleteBoard.do")
    public String delNotice(Model model, @RequestParam Map<String, Object> params){
        boardService.deleteBoard(params);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }


    @RequestMapping(value="/ckeditor/fileupload.do", method= RequestMethod.POST)
    public void fileupload(HttpServletRequest request, HttpServletResponse response, MultipartHttpServletRequest multiFile) throws IOException {
        logger.info("---------------- fileupload ----------------");

        PrintWriter pw = null;
        OutputStream os = null;
        MultipartFile file = multiFile.getFile("upload");
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        if(file != null) {
            if(file.getSize() > 0 && StringUtils.isNotBlank(file.getName())) {

                if(file.getContentType().toLowerCase().startsWith("image/")) {

                    String path = "";

                    if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1") || servletRequest.getServerName().contains("218.158.231.186")){
                        path = SERVER_DIR + "ckeditor";
                    }else{
                        path = SERVER_DIR + "ckeditor";
                    }

                    try {
                        String fileName = file.getOriginalFilename();
                        byte[] bytes = file.getBytes();

                        String filename_ext = fileName.substring(fileName.lastIndexOf(".") + 1);
                        filename_ext = filename_ext.toLowerCase();

                        logger.info("fileName : " + fileName + ", extension : " + filename_ext);

                        String realFilePath = path + slash;

                        logger.info("default path : " + path + " , realFilePath : " + realFilePath);

                        File uploadFile = new File(realFilePath);
                        if(!uploadFile.exists()) {
                            uploadFile.mkdirs();
                        }

                        fileName = UUID.randomUUID().toString() + "." + filename_ext;

                        os = new FileOutputStream(new File(realFilePath + fileName));
                        os.write(bytes);
                        os.flush(); // outputStream 에 저장된 데이터를 전송하고 초기화

                        String callback = request.getParameter("CKEditorFuncNum");
                        logger.info("callback funcNum : " + callback);

                        pw = response.getWriter();
                        String fileUrl = "/ckeditor/imgsubmit.do?fileName=" + fileName;

                        // 업로드시 메시지 출력
                        pw.println("{\"filename\" : \""+fileName+"\", \"uploaded\" : 1, \"url\":\""+fileUrl+"\"}");
                        pw.flush();

                    } catch(IOException e) {
                        e.printStackTrace();
                    } finally {
                        if(os != null) {
                            os.close();
                        }
                        if(pw != null) {
                            pw.close();
                        }
                    }
                }
            }
        }

        return;
    }

    @RequestMapping("/ckeditor/imgsubmit.do")
    public void imgsubmit(@RequestParam(value="fileName") String fileName, HttpServletRequest request, HttpServletResponse response) throws IOException {
        //서버에 저장된 이미지 경로
        String filePath = SERVER_DIR + "ckeditor" + slash + fileName;
        File imgFile = new File(filePath);

        //사진 이미지 찾지 못하는 경우 예외처리로 빈 이미지 파일을 설정한다.
        if(imgFile.isFile()) {
            byte[] buf = new byte[1024];
            int readByte = 0;
            int length = 0;
            byte[] imgBuf = null;

            FileInputStream fileInputStream = null;
            ByteArrayOutputStream outputStream = null;
            ServletOutputStream out = null;

            try{
                fileInputStream = new FileInputStream(imgFile);
                outputStream = new ByteArrayOutputStream();
                out = response.getOutputStream();

                while((readByte = fileInputStream.read(buf)) != -1){
                    outputStream.write(buf, 0, readByte);
                }

                imgBuf = outputStream.toByteArray();
                length = imgBuf.length;
                out.write(imgBuf, 0, length);
                out.flush();

            } catch(IOException e){
                logger.info(e.getMessage());
            } finally {
                outputStream.close();
                fileInputStream.close();
                out.close();
            }
        }

    }



    /*//사업공고
    @RequestMapping("/camtic/news/business.do")
    public String Nbusiness(){ return "camtic/news/business"; }
    //교육/행사
    @RequestMapping("/camtic/news/study.do")
    public String Nstudy(){ return "camtic/news/study"; }
    //유관기관소식
    @RequestMapping("/camtic/news/partner.do")
    public String Npartner(){ return "camtic/news/partner"; }
    @RequestMapping("/camtic/news/view.do")
    public String Nview(){ return "camtic/news/view"; }*/




}
