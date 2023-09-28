package egovframework.devjitsu.common.utiles;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
public class FileUtils {

    private static final Log LOG = LogFactory.getLog(FileUtils.class);

    ArrayList fileList1 = new ArrayList();

    public static File[] folderList(String path) {
        File root = new File(path);
        File[] listFile = root.listFiles();
        if (listFile != null) {
            ArrayList<File> folderList = new ArrayList();
            for (int i = 0; i < listFile.length; i++) {
                if (listFile[i].isDirectory())
                    folderList.add(listFile[i]);
            }
            return folderList.<File>toArray(new File[0]);
        }
        return null;
    }

    public static File[] fileList(String path) {
        File root = new File(path);
        File[] listFile = root.listFiles();
        if (listFile != null) {
            ArrayList<File> folderList = new ArrayList();
            for (int i = 0; i < listFile.length; i++) {
                if (!listFile[i].isDirectory())
                    folderList.add(listFile[i]);
            }
            return folderList.<File>toArray(new File[0]);
        }
        return null;
    }

    public static boolean rmDir(String path) {
        String addr = null;
        boolean isSuccessFlag = false;
        try {
            addr = path;
            File dir = new File(addr);
            if (dir != null) {
                String[] fileList = dir.list();
                for (int i = 0; i < fileList.length; i++) {
                    File dirFile = new File(String.valueOf(addr) + "/" + fileList[i]);
                    if (dirFile.isFile()) {
                        dirFile.delete();
                    } else if (dirFile.isDirectory()) {
                        String[] fileDirList = dirFile.list();
                        for (int j = 0; j < fileDirList.length; j++)
                            FileDeleteDir(String.valueOf(addr) + "/" + fileList[i] + "/" + fileDirList[j]);
                        dirFile.delete();
                    }
                }
                dir.delete();
                isSuccessFlag = true;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return isSuccessFlag;
    }

    public static boolean FileDeleteDir(String fDir) {
        File subFile = new File(fDir);
        if (subFile.isFile()) {
            subFile.delete();
        } else if (subFile.isDirectory()) {
            String[] subFList = subFile.list();
            for (int i = 0; i < subFList.length; i++)
                FileDeleteDir(String.valueOf(fDir) + "/" + subFList[i]);
            subFile.delete();
        }
        return true;
    }

    public static void copyIO(String oldfile, String targetfile) throws Exception {
        File f = new File(oldfile);
        File tf = new File(targetfile);
        if (f.isDirectory()) {
            if (!tf.exists())
                tf.mkdirs();
            String[] children = f.list();
            for (int i = 0; i < children.length; i++)
                copyIO(String.valueOf(oldfile) + "/" + children[i], String.valueOf(targetfile) + "/" + children[i]);
        } else {
            FileInputStream fIn = null;
            FileOutputStream fOut = null;
            FileChannel in = null;
            FileChannel out = null;
            try {
                fIn = new FileInputStream(oldfile);
                fOut = new FileOutputStream(targetfile);
                in = fIn.getChannel();
                out = fOut.getChannel();
                byte[] buf = new byte[1024];
                int i;
                while ((i = fIn.read(buf)) != -1)
                    fOut.write(buf, 0, i);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (in != null)
                    try {
                        in.close();
                    } catch (Exception ignore) {
                        LOG.error(ignore);
                    }
                if (out != null)
                    try {
                        out.close();
                    } catch (Exception ignore) {
                        LOG.error(ignore);
                    }
                if (fIn != null)
                    try {
                        fIn.close();
                    } catch (Exception ignore) {
                        LOG.error(ignore);
                    }
                if (fOut != null)
                    try {
                        fOut.close();
                    } catch (Exception ignore) {
                        LOG.error(ignore);
                    }
            }
        }
    }

    public static void copyMap(String oldfile, String targetfile) throws Exception {
        FileInputStream fIn = new FileInputStream(oldfile);
        FileOutputStream fOut = new FileOutputStream(targetfile);
        FileChannel in = fIn.getChannel();
        FileChannel out = fOut.getChannel();
        try {
            MappedByteBuffer m = in.map(FileChannel.MapMode.READ_ONLY, 0L, in.size());
            out.write(m);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (in != null)
                try {
                    in.close();
                } catch (Exception ignore) {
                    LOG.error(ignore);
                }
            if (out != null)
                try {
                    out.close();
                } catch (Exception ignore) {
                    LOG.error(ignore);
                }
            if (fIn != null)
                try {
                    fIn.close();
                } catch (Exception ignore) {
                    LOG.error(ignore);
                }
            if (fOut != null)
                try {
                    fOut.close();
                } catch (Exception ignore) {
                    LOG.error(ignore);
                }
        }
    }

    public static void copyNIO(String oldfile, String targetfile) throws Exception {
        File f = new File(oldfile);
        if (f.isDirectory()) {
            String[] children = f.list();
            for (int i = 0; i < children.length; i++)
                copyIO(String.valueOf(oldfile) + "/" + children[i], String.valueOf(targetfile) + "/" + children[i]);
        } else {
            FileInputStream fIn = new FileInputStream(oldfile);
            FileOutputStream fOut = new FileOutputStream(targetfile);
            FileChannel in = fIn.getChannel();
            FileChannel out = fOut.getChannel();
            try {
                ByteBuffer buf = ByteBuffer.allocate((int)in.size());
                in.read(buf);
                buf.flip();
                out.write(buf);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (in != null)
                    try {
                        in.close();
                    } catch (Exception ignore) {
                        LOG.error(ignore);
                    }
                if (out != null)
                    try {
                        out.close();
                    } catch (Exception ignore) {
                        LOG.error(ignore);
                    }
                if (fIn != null)
                    try {
                        fIn.close();
                    } catch (Exception ignore) {
                        LOG.error(ignore);
                    }
                if (fOut != null)
                    try {
                        fOut.close();
                    } catch (Exception ignore) {
                        LOG.error(ignore);
                    }
                f.delete();
            }
        }
    }

    public static void copyTransfer(String oldfile, String targetfile) throws Exception {
        File srcFile = new File(oldfile);
        File destFile = new File(targetfile);
        org.apache.commons.io.FileUtils.copyFile(srcFile, destFile);
    }

    public static void moveTransfer(File oldfile, File targetfile) throws Exception {
        if (oldfile.isDirectory()) {
            boolean rename = oldfile.renameTo(targetfile);
            if (!rename) {
                if (targetfile.getCanonicalPath().startsWith(oldfile.getCanonicalPath()))
                    throw new IOException("Cannot move directory: " + oldfile + " to a subdirectory of itself: " + targetfile);
                org.apache.commons.io.FileUtils.copyDirectory(oldfile, targetfile);
                org.apache.commons.io.FileUtils.deleteDirectory(oldfile);
                if (oldfile.exists())
                    LOG.info("ignore: Failed to delete original directory '" + oldfile + "' after copy to '" + targetfile + "'");
            }
        } else {
            boolean rename = oldfile.renameTo(targetfile);
            if (!rename) {
                org.apache.commons.io.FileUtils.copyFile(oldfile, targetfile);
                if (!oldfile.delete()) {
                    org.apache.commons.io.FileUtils.deleteQuietly(targetfile);
                    LOG.info("ignore: Failed to delete original file '" + oldfile + "' after copy to '" + targetfile + "'");
                }
            }
        }
    }

    public static void moveTransfer(String oldFilePathName, String targetFilePathName) throws Exception {
        File oldfile = new File(oldFilePathName);
        File targetfile = new File(targetFilePathName);
        if (oldfile.isDirectory()) {
            boolean rename = oldfile.renameTo(targetfile);
            if (!rename) {
                if (targetfile.getCanonicalPath().startsWith(oldfile.getCanonicalPath()))
                    throw new IOException("Cannot move directory: " + oldfile + " to a subdirectory of itself: " + targetfile);
                org.apache.commons.io.FileUtils.copyDirectory(oldfile, targetfile);
                org.apache.commons.io.FileUtils.deleteDirectory(oldfile);
                if (oldfile.exists())
                    throw new IOException("Failed to delete original directory '" + oldfile +
                            "' after copy to '" + targetfile + "'");
            }
        } else {
            boolean rename = oldfile.renameTo(targetfile);
            if (!rename) {
                org.apache.commons.io.FileUtils.copyFile(oldfile, targetfile);
                if (!oldfile.delete()) {
                    org.apache.commons.io.FileUtils.deleteQuietly(targetfile);
                    throw new IOException("Failed to delete original file '" + oldfile +
                            "' after copy to '" + targetfile + "'");
                }
            }
        }
    }

    public static void moveDirs(File oldfile, File targetfile) throws Exception {
        if (oldfile.isDirectory()) {
            if (!targetfile.exists())
                targetfile.mkdirs();
            String[] children = oldfile.list();
            for (int i = 0; i < children.length; i++) {
                if (!children[i].equals("imsmanifest.xml"))
                    copyIO(oldfile + "/" + children[i], targetfile + "/" + children[i]);
            }
        } else {
            oldfile.renameTo(targetfile);
        }
    }

    public ArrayList scanDir(String dir, boolean checksubdir) {
        try {
            File file = new File(dir);
            if (file.exists())
                for (int i = 0; i < (file.list()).length; i++) {
                    File tmpfile = new File(String.valueOf(dir) + File.separator + file.list()[i]);
                    if (tmpfile.isDirectory() && checksubdir) {
                        scanDir(String.valueOf(dir) + File.separator + file.list()[i], checksubdir);
                    } else {
                        this.fileList1.add(tmpfile);
                    }
                }
            return this.fileList1;
        } catch (Exception e) {
            return this.fileList1;
        }
    }

    public static void unzip(ZipFile zipFile, String toDir, String encoding) throws Exception {
        for (Enumeration<? extends ZipEntry> zipEntries = zipFile.entries(); zipEntries.hasMoreElements(); ) {
            ZipEntry entry = zipEntries.nextElement();
            String name = entry.getName();
            name = new String(name.getBytes("latin1"), encoding);
            name = name.replaceAll("\\\\", "/");
            InputStream zis = null;
            FileOutputStream fos = null;
            File uncompressedFileDir = null;
            File uncompressedFile = null;
            if (!entry.isDirectory()) {
                zis = zipFile.getInputStream(entry);
                if ((name.split("/")).length > 1) {
                    uncompressedFileDir = new File(String.valueOf(toDir) + "/" + name.substring(0, name.lastIndexOf("/")));
                    uncompressedFileDir.mkdirs();
                }
                String tempFile = String.valueOf(toDir) + File.separator + name;
                uncompressedFile = new File(tempFile);
                if (!uncompressedFile.exists() && !uncompressedFile.createNewFile())
                    throw new Exception(String.valueOf(name) + " 파일 생성 실패");
                if (!uncompressedFile.isDirectory()) {
                    fos = new FileOutputStream(uncompressedFile);
                    byte[] buffer = new byte[4096];
                    int read = 0;
                    for (read = zis.read(buffer); read >= 0; read = zis.read(buffer))
                        fos.write(buffer, 0, read);
                    fos.close();
                    zis.close();
                }
            }
        }
        zipFile.close();
    }

    public static String[] unzip(String toDir, String[] files) throws Exception {
        String encoding = "MS949";
        String[] retval = new String[files.length];
        for (int i = 0; i < files.length; i++) {
            String pifFolder = files[i].substring(0, files[i].lastIndexOf("."));
            String pifFile = files[i].substring(files[i].lastIndexOf(File.separator));
            File givenFile = new File(String.valueOf(toDir) + File.separator + pifFolder + File.separator + pifFile);
            File dir = new File(String.valueOf(toDir) + File.separator + files[i].substring(0, files[i].lastIndexOf(".zip")));
            if (!dir.isDirectory())
                dir.mkdirs();
            if (givenFile.exists()) {
                ZipFile zipFile = new ZipFile(givenFile);
                unzip(zipFile, String.valueOf(toDir) + File.separator + pifFolder, encoding);
            }
            givenFile.delete();
            givenFile.deleteOnExit();
            retval[i] = String.valueOf(toDir) + File.separator + files[i].substring(0, files[i].lastIndexOf("."));
        }
        return retval;
    }

    public static void makeFile(File f, String filedecs) throws Exception {
        f.delete();
        FileOutputStream fOut = new FileOutputStream(f);
        byte[] b = filedecs.getBytes("euc-kr");
        try {
            fOut.write(b);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (fOut != null)
                fOut.close();
        }
    }

    public static void copyFile(CommonsMultipartFile sourceFile, File destFile) throws IOException {
        FileItem fileItem = sourceFile.getFileItem();
        byte[] buffer = new byte[20971520];
        InputStream in = fileItem.getInputStream();
        OutputStream out = new FileOutputStream(destFile);
        try {
            IOUtils.copyLarge(in, out, buffer);
        } catch (Exception e) {
            LOG.error(e);
        } finally {
            if (in != null)
                try {
                    in.close();
                } catch (Exception e) {
                    LOG.error(e);
                }
            if (out != null)
                try {
                    out.close();
                } catch (Exception e) {
                    LOG.error(e);
                }
            if (fileItem != null)
                try {
                    fileItem.delete();
                } catch (Exception e) {
                    LOG.error(e);
                }
        }
    }

    public static File getUrlFileDownload(String urlStr, String filePath) {
        OutputStream outStream = null;
        URLConnection uCon = null;
        InputStream is = null;
        try {
            File f = new File(filePath);
            if (!f.getParentFile().exists())
                f.getParentFile().mkdirs();
            URL url = new URL(urlStr);
            outStream = new BufferedOutputStream(new FileOutputStream(filePath));
            uCon = url.openConnection();
            is = uCon.getInputStream();
            byte[] buf = new byte[1024];
            int byteRead;
            while ((byteRead = is.read(buf)) != -1)
                outStream.write(buf, 0, byteRead);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (is != null)
                    is.close();
                if (outStream != null)
                    outStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new File(filePath);
    }

    public static String sanitizeFileName(String name, int length) {
        if (name == null || name.length() < 1)
            return "";
        if (length != -1 && name.length() > length)
            name = name.substring(0, length);
        return name.replaceAll("[:\\\\/*?|<>]", "_").trim();
    }

}
