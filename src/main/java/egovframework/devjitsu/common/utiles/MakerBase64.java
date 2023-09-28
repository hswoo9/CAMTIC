package egovframework.devjitsu.common.utiles;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;

public class MakerBase64 {

    private static final Logger logger = LoggerFactory.getLogger(MakerBase64.class);

    public String imageToBase64Logo(HttpServletRequest request, String type){
        String base64Img = "";
        String imageFile = "";
        String logoImageFile = request.getSession().getServletContext().getRealPath("/gdoc/logo.jpg");
        String symbolImageFile = request.getSession().getServletContext().getRealPath("/gdoc/symbol.jpg");
        if(type.equals("logo")){
            imageFile = logoImageFile;
        }else{
            imageFile = symbolImageFile;
        }

        logger.info("================= [ FilePath ] =================");
        logger.info(imageFile);
        logger.info("================= [ FilePathEnd ] =================");
        File file = new File(imageFile);
        if(file.exists() && file.isFile() && file.length() > 0){
            byte[] bt = new byte[(int) file.length()];
            FileInputStream fis = null;
            try{
                fis = new FileInputStream(file);
                fis.read(bt);
                base64Img = new String(Base64.encodeBase64(bt, false));

                DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
                DocumentBuilder docBuilder = docFactory.newDocumentBuilder();

                Document doc = docBuilder.newDocument();
                doc.setXmlStandalone(true);

                Element book = doc.createElement("test");
                doc.appendChild(book);

                Element code = doc.createElement("code");
                book.appendChild(code);

                Element text = doc.createElement("text");
                text.appendChild(doc.createTextNode(base64Img));
                code.appendChild(text);

                TransformerFactory transformerFactory = TransformerFactory.newInstance();

                Transformer transformer = transformerFactory.newTransformer();
                transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4"); //정렬 스페이스4칸
                transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
                transformer.setOutputProperty(OutputKeys.INDENT, "yes"); //들여쓰기
                transformer.setOutputProperty(OutputKeys.DOCTYPE_PUBLIC, "yes"); //doc.setXmlStandalone(true); 했을때 붙어서 출력되는부분 개행

                DOMSource source = new DOMSource(doc);
                StreamResult result = new StreamResult(new FileOutputStream(new File(request.getSession().getServletContext().getRealPath("/gdoc/test"+ type +".xml"))));

                transformer.transform(source, result);
                System.out.println("==========================================================================================================");
            }catch (Exception e){
                try {
                    throw e;
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                } catch (ParserConfigurationException ex) {
                    throw new RuntimeException(ex);
                } catch (TransformerException ex) {
                    throw new RuntimeException(ex);
                }
            } finally {
                try {
                    if(fis != null){
                        fis.close();
                    }
                }catch (IOException e){

                }catch (Exception e){

                }
            }
        }
        logger.info("================= [ base64Img ] =================");
        logger.info(base64Img);
        logger.info("================= [ base64ImgEnd ] =================");
        return base64Img;
    }

    public String base64ToString(String base64){
        byte[] bt = Base64.decodeBase64(base64);
        return new String(bt, Charset.forName("EUC-KR"));
    }
}
